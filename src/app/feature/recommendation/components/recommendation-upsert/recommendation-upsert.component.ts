import { Component, OnInit, ViewChild } from '@angular/core';
import { Recommendation } from '../../models/recommendation.model';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../../shared/shared-common/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../shared/shared-common/services';
import { ActionType, FormAction } from 'src/app/shared/shared-common/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Bundle } from '../../../bundle/models/bundle.model';
import { DisplayBundle } from '../../../bundle/models/display-bundle.model';
import { BundleService } from '../../../../shared/shared-bundle/services';
import { DropdownSelectMode } from 'ornamentum';
import { BundleSaveEventArgs } from '../../../bundle/models/bundle-save-event-args.model';
import { AlertType, SuccessStatus } from '../../../../core/enums';
import { NotificationService } from '../../../../core/services';
import { RecommendationConstants } from '../../recommendation.constants';
import { RecommendationSave } from '../../models/recommendation-save.model';
import { SuccessResponse } from '../../../../core/models';
import { RecommendationService } from '../../services';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';
import { BundleFormComponent } from '../../../../shared/shared-bundle/components';

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
  public ActionType = ActionType;
  public FormAction = FormAction;
  public actionBreadcrumb: ActionBreadcrumb[];

  public recForm: FormGroup;
  private formAction: FormAction;
  public selectedBundle: Bundle;

  public recommendation: Recommendation;
  public bundleDropdownData: Bundle[];
  public isBundleAdd = false;

  @ViewChild(BundleFormComponent, {static: true})
  public bundleFormComponent: BundleFormComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bundleService: BundleService,
    private dialogService: ConfirmDialogService,
    private notificationService: NotificationService,
    private recommendationService: RecommendationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'recommendations/list',
        title: 'Recommendations'
      }
    ];
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { rec: Recommendation; formAction: FormAction }) => {
      if (data.rec) {
        this.recommendation = data.rec;
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

  private fetchBundles(): void {
    this.bundleService.getBundles().subscribe((displayBundle: DisplayBundle) => {
      this.bundleDropdownData = displayBundle.bundles;
    });
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.recForm.get(controlName));
  }

  public redirectToRecsView() {
    this.router.navigate(['recommendations']);
  }

  public onBundleSaveClick(saveEventArgs: BundleSaveEventArgs) {
    if (saveEventArgs.isSuccess) {
      this.fetchBundles();
      this.isBundleAdd = !this.isBundleAdd;
    }
  }

  private buildFormGroup() {
    if (!this.recommendation) {
      this.recForm = this.fb.group({
        recName: [null, Validators.required],
        selectedBundle: [null, Validators.required]
      });
    } else {
      this.recForm = this.fb.group({
        recName: [this.recommendation.name, Validators.required],
        selectedBundle: [this.recommendation.bundle, Validators.required]
      });
    }
  }

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

  public onRecSaveClick(clickEventArgs: ActionClickEventArgs) {
    FormValidator.validateAllFormFields(this.recForm);

    if (this.recForm.invalid) {
      clickEventArgs.resolve();
      this.notificationService.showNotification(RecommendationConstants.recommendation_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formValue = this.recForm.value;
    const recommendation: RecommendationSave = {
      name: formValue.recName,
      bundleId: formValue.selectedBundle.id
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

  private addNewRecommendation(recommendation: RecommendationSave, clickEventArgs: ActionClickEventArgs) {
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

  private editRecommendation(recommendation: RecommendationSave, clickEventArgs: ActionClickEventArgs) {
    recommendation.recId = this.recommendation.id;
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
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.recForm.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }
}
