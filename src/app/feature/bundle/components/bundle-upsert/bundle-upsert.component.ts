import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAction, ActionType } from '../../../../shared/shared-common/enums';
import { Bundle } from '../../models/bundle.model';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../../shared/shared-common/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlgorithmSelectorComponent } from '../../../../shared/shared-algorithm/components';
import { CustomFormValidator, FormValidator } from '../../../../shared/shared-common/services';
import { AlertType, SuccessStatus } from '../../../../core/enums';
import { NotificationService } from '../../../../core/services';
import { BundleConstants } from '../../bundle.constants';
import { BundleService } from '../../../../shared/shared-bundle/services';
import { SuccessResponse } from '../../../../core/models';
import { AlgorithmUtilityService } from '../../../../shared/shared-algorithm/services';

/**
 * Class representing bundle add new and edit components.
 * @implements OnInit
 * @class BundleUpsertComponent.
 */
@Component({
  selector: 'app-bundle-upsert',
  styleUrls: ['./bundle-upsert.component.scss'],
  templateUrl: './bundle-upsert.component.html'
})
export class BundleUpsertComponent implements OnInit {
  public ActionType = ActionType;
  public FormAction = FormAction;
  public actionBreadcrumb: ActionBreadcrumb[];

  private bundle: Bundle;
  private formAction: FormAction;
  public bundleForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bundleService: BundleService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'bundles/list',
        title: 'Bundles'
      }
    ];
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { bundle: Bundle; formAction: FormAction }) => {
      if (data.bundle) {
        this.bundle = data.bundle;
      }

      this.formAction = data.formAction;
      switch (this.formAction) {
        case FormAction.EDIT:
          if (!this.bundle) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `bundles/edit/${this.bundle.id}`,
            title: 'Edit Bundle'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'bundles/add',
            title: 'Add New Bundle'
          });
          break;
      }
    });

    this.buildFormGroup();
    this.onCombinedEnabledChange();
    this.onDefaultLimitEnabledChange();
  }

  private buildFormGroup() {
    if (this.bundle) {
      this.bundleForm = this.fb.group({
        bundleName: [this.bundle.name, Validators.required],
        combineEnabled: [this.bundle.combineEnabled],
        combineDisplayText: [this.bundle.combineDisplayText],
        defaultLimitEnabled: [this.bundle.defaultLimit > 0],
        defaultLimit: [
          this.bundle.defaultLimit,
          Validators.compose([
            Validators.min(1),
            Validators.max(999),
            CustomFormValidator.regexPattern(CustomFormValidator.integer_regex)
          ])
        ],
        algorithms: AlgorithmSelectorComponent.buildFormGroup(this.fb, {
          algorithms: this.bundle.algorithms,
        })
      });
      return;
    }
    this.bundleForm = this.fb.group({
      bundleName: [null, Validators.required],
      combineEnabled: [null],
      combineDisplayText: [null],
      defaultLimitEnabled: [false],
      defaultLimit: [
        5,
        Validators.compose([
          Validators.min(1),
          Validators.max(999),
          CustomFormValidator.regexPattern(CustomFormValidator.integer_regex)
        ])
      ],
      algorithms: AlgorithmSelectorComponent.buildFormGroup(this.fb, {
        algorithms: [],
      })
    });
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.bundleForm.get(controlName));
  }

  public onCombinedEnabledChange(): void {
    const isCombineEnabled = this.bundleForm.get('combineEnabled').value;
    if (isCombineEnabled) {
      FormValidator.setControlValidators(this.bundleForm.get('combineDisplayText'), Validators.required);
    } else {
      FormValidator.clearControlValidators(this.bundleForm.get('combineDisplayText'));
    }
  }

  public onDefaultLimitEnabledChange(): void {
    const isDefaultLimitEnabled = this.bundleForm.get('defaultLimitEnabled').value;
    if (isDefaultLimitEnabled) {
      FormValidator.setControlValidators(this.bundleForm.get('defaultLimit'), Validators.required);
    } else {
      FormValidator.clearControlValidators(this.bundleForm.get('defaultLimit'));
    }
  }

  public onSaveClick(actionClickArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.bundleForm);

    if (this.bundleForm.invalid) {
      actionClickArgs.resolve();
      this.notificationService.showNotification(BundleConstants.bundle_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formValue = this.bundleForm.value;
    const bundle: Bundle = {
      name: formValue.bundleName,
      defaultLimit: formValue.defaultLimitEnabled ? formValue.defaultLimit : 0,
      algorithms: AlgorithmUtilityService.mapAlgorithmList(formValue.algorithms.algorithms),
      combineEnabled: formValue.combineEnabled || false,
      combineDisplayText: formValue.combineEnabled ? formValue.combineDisplayText : null,
    };

    switch (this.formAction) {
      case FormAction.ADD:
        this.addNewBundle(bundle, actionClickArgs);
        break;
      case FormAction.EDIT:
        this.editBundle(bundle, actionClickArgs);
        break;
    }
  }

  public addNewBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs) {
    this.bundleService.createBundle(bundle).subscribe(
      (response: SuccessResponse) => {
        actionClickArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.bundleForm.markAsPristine();
        this.redirectToBundleView();
      },
      (error) => {
        this.notificationService.showNotification(error.message, AlertType.ERROR);
        actionClickArgs.resolve();
      });
  }

  public editBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs) {
    this.bundleService.updateBundle(bundle).subscribe(
      (response: SuccessResponse) => {
        actionClickArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.bundleForm.markAsPristine();
        this.redirectToBundleView();
      },
      (error) => {
        this.notificationService.showNotification(error.message, AlertType.ERROR);
        actionClickArgs.resolve();
      });
  }

  public redirectToBundleView(): void {
    this.router.navigate(['bundles']);
  }
}
