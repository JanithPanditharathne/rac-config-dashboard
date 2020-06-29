import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { DropdownSelectMode } from 'ornamentum';

import { Recommendation } from '../../models';
import { SuccessResponse } from '../../../../core/models';
import { Bundle } from '../../../bundle/models/bundle.model';
import { DisplayBundle } from '../../../bundle/models/display-bundle.model';
import { BundleSaveEventArgs } from '../../../bundle/models/bundle-save-event-args.model';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../../core/enums';
import { ActionButtonType, ActionType, FormAction } from 'src/app/shared/shared-common/enums';

import { BundleFormComponent } from '../../../../shared/shared-bundle/components';

import { NotificationService } from '../../../../core/services';
import { FormValidator } from '../../../../shared/shared-common/services';
import { BundleService, BundleUtilityService } from '../../../../shared/shared-bundle/services';
import { RecommendationService } from '../../../../shared/shared-rec/services';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

import { RecommendationConstants } from '../../recommendation.constants';

/**
 * Class representing the Recommendation upsert component.
 * @class RecommendationUpsertComponent.
 */
@Component({
  selector: 'app-recommendation',
  styleUrls: ['./recommendation-upsert.component.scss'],
  templateUrl: './recommendation-upsert.component.html'
})
export class RecommendationUpsertComponent implements OnInit {
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public actionBreadcrumb: ActionBreadcrumb[];
  public ActionButtonType = ActionButtonType;
  public ActionType = ActionType;
  public FormAction = FormAction;

  public isEdit: boolean;
  public recForm: FormGroup;
  public isBundleAdd = false;
  public formAction: FormAction;
  public selectedBundle: Bundle;
  public recommendation: Recommendation;
  public bundleDropdownData: Bundle[];

  @ViewChild(BundleFormComponent, {static: true})
  public bundleFormComponent: BundleFormComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bundleService: BundleService,
    private dialogService: ConfirmDialogService,
    private notificationService: NotificationService,
    private bundleUtilityService: BundleUtilityService,
    private recommendationService: RecommendationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'recommendations/list',
        title: 'Recommendations'
      }
    ];
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.route.data.subscribe((data: { rec: Recommendation; formAction: FormAction }) => {
      if (data.rec) {
        this.recommendation = data.rec;
        this.isEdit = true;
      }

      this.formAction = data.formAction;
      switch (this.formAction) {
        case FormAction.EDIT:
          if (!this.recommendation) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `recommendations/edit/${this.recommendation.id}`,
            title: 'Edit Recommendation'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'recommendations/add',
            title: 'Add New Recommendation'
          });
          break;
      }
    });
    this.buildFormGroup();
    this.fetchBundles();
  }

  /**
   * Responsible for fetch bundle data.
   */
  private fetchBundles(): void {
    this.bundleService.getBundles().subscribe((displayBundle: DisplayBundle) => {
      this.bundleDropdownData = displayBundle.bundles.map((bundle: Bundle) => {
        return this.bundleUtilityService.parseBundleDropdownItem(bundle);
      });
    });
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.recForm.get(controlName));
  }

  /**
   * Responsible for redirect to recs view page.
   */
  public redirectToRecsView(): void {
    this.router.navigate(['recommendations']);
  }

  /**
   * Bundle save click event handler.
   * @param {BundleSaveEventArgs} saveEventArgs click event arguments.
   */
  public onBundleSaveClick(saveEventArgs: BundleSaveEventArgs): void {
    if (saveEventArgs.isSuccess) {
      this.recForm.get('selectedBundle').reset();
      this.fetchBundles();
      this.isBundleAdd = !this.isBundleAdd;
    }
  }

  /**
   * Responsible for show/hide side pane.
   */
  public switchSidePaneVisibility(): void {
    if (this.bundleFormComponent.bundleFormGroup.dirty) {
      this.dialogService.routeDiscardConfirm().subscribe((isDiscard: boolean) => {
        if (isDiscard) {
          this.isBundleAdd = !this.isBundleAdd;
          this.bundleFormComponent.bundleFormGroup.reset({
              defaultLimit: 5,
              algorithms: {
                algorithms: []
              }
            }
          );
        }
      });
    } else {
      this.isBundleAdd = !this.isBundleAdd;
    }
  }

  /**
   * Recs save click event handler.
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  public onRecSaveClick(clickEventArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.recForm);

    if (this.recForm.invalid) {
      clickEventArgs.resolve();
      this.notificationService.showNotification(RecommendationConstants.recommendation_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formValue = this.recForm.value;
    const recommendation: Recommendation = {
      name: formValue.recName,
      bundle: {
        id: formValue.selectedBundle.id
      }
    };

    switch (this.formAction) {
      case FormAction.ADD:
        this.addNewRecommendation(recommendation, clickEventArgs);
        break;
      case FormAction.EDIT:
        this.editRecommendation(recommendation, clickEventArgs);
        break;
    }
  }

  /**
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.recForm.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }

  /**
   * Responsible for add new recommendation.
   * @param {Recommendation} recommendation details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private addNewRecommendation(recommendation: Recommendation, clickEventArgs: ActionClickEventArgs): void {
    this.recommendationService.createRec(recommendation).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.recForm.markAsPristine();
        this.redirectToRecsView();
      },
      (error) => {
        this.notificationService.showNotification(error.message, AlertType.ERROR);
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for update a recommendation.
   * @param {Recommendation} recommendation details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private editRecommendation(recommendation: Recommendation, clickEventArgs: ActionClickEventArgs): void {
    recommendation.id = this.recommendation.id;
    this.recommendationService.updateRec(recommendation).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.recForm.markAsPristine();
        this.redirectToRecsView();
      },
      (error) => {
        this.notificationService.showNotification(error.message, AlertType.ERROR);
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for build form group.
   */
  private buildFormGroup(): void {
    if (!this.recommendation) {
      this.recForm = this.fb.group({
        recId: [null],
        recName: [null],
        selectedBundle: [null, Validators.required]
      });
    } else {
      this.recForm = this.fb.group({
        recId: [this.recommendation.id],
        recName: [this.recommendation.name],
        selectedBundle: [
          this.bundleUtilityService.parseBundleDropdownItem(this.recommendation.bundle),
          Validators.required
        ]
      });
    }
  }
}
