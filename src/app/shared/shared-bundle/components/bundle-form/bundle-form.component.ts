import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormAction, ActionType } from 'src/app/shared/shared-common/enums';
import { Bundle } from '../../../../feature/bundle/models/bundle.model';
import { BundleSaveEventArgs } from '../../../../feature/bundle/models/bundle-save-event-args.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidator, FormValidator } from '../../../shared-common/services';
import { AlgorithmSelectorComponent } from '../../../shared-algorithm/components';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../shared-common/models';
import { AlertType } from '../../../../core/enums';
import { AlgorithmUtilityService } from '../../../shared-algorithm/services';
import { SuccessResponse } from '../../../../core/models';
import { BundleService } from '../../services';
import { NotificationService } from '../../../../core/services';
import { SharedBundleConstants } from '../../shared-bundle.constants';

/**
 * Class representing the Bundle form component component.
 * @implements OnInit, OnDestroy
 * @class BundleFormComponent.
 */
@Component({
  selector: 'app-bundle-form',
  styleUrls: ['./bundle-form.component.scss'],
  templateUrl: './bundle-form.component.html'
})
export class BundleFormComponent implements OnInit {
  public ActionType = ActionType;
  public FormAction = FormAction;
  public actionBreadcrumb: ActionBreadcrumb[];

  public bundleId: string;

  public bundleFormGroup: FormGroup;

  @Input()
  public bundle: Bundle;

  @Input()
  public formAction: FormAction;

  @Output()
  public saveBundle: EventEmitter<BundleSaveEventArgs> = new EventEmitter<BundleSaveEventArgs>();

  @Output()
  public cancelBundle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private bundleService: BundleService,
    private notificationService: NotificationService
  ) {
  }

  public ngOnInit(): void {
    if (this.bundle) {
      this.bundleId = this.bundle.id;
    }
    this.initBundleFormGroup();
    this.onCombinedEnabledChange();
    this.onDefaultLimitEnabledChange();
  }

  private initBundleFormGroup() {
    if (this.bundle) {
      this.bundleFormGroup = this.fb.group({
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
    this.bundleFormGroup = this.fb.group({
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

  public onSaveClick(actionClickArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.bundleFormGroup);

    if (this.bundleFormGroup.invalid) {
      actionClickArgs.resolve();
      this.notificationService.showNotification(SharedBundleConstants.bundle_create_invalid_bundle_form, AlertType.ERROR);
      return;
    }

    const formValue = this.bundleFormGroup.value;
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

  public onCombinedEnabledChange(): void {
    const isCombineEnabled = this.bundleFormGroup.get('combineEnabled').value;
    if (isCombineEnabled) {
      FormValidator.setControlValidators(this.bundleFormGroup.get('combineDisplayText'), Validators.required);
    } else {
      FormValidator.clearControlValidators(this.bundleFormGroup.get('combineDisplayText'));
    }
  }

  public onDefaultLimitEnabledChange(): void {
    const isDefaultLimitEnabled = this.bundleFormGroup.get('defaultLimitEnabled').value;
    if (isDefaultLimitEnabled) {
      FormValidator.setControlValidators(this.bundleFormGroup.get('defaultLimit'),
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(999)]
        ));
    } else {
      FormValidator.clearControlValidators(this.bundleFormGroup.get('defaultLimit'));
    }
  }

  public addNewBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs) {
    this.bundleService.createBundle(bundle).subscribe(
      (response: SuccessResponse) => {
        this.bundleSaveSuccess(actionClickArgs, bundle, response.message);
        this.bundleFormGroup.markAsPristine();
        this.bundleFormGroup.reset({
            defaultLimit: 5,
            algorithms: {
              algorithms: []
            }
          }
        );
      },
      () => {
        this.bundleSaveFail(actionClickArgs);
      });
  }

  public editBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs) {
    bundle.id = this.bundle.id;
    this.bundleService.updateBundle(bundle).subscribe(
      (response: SuccessResponse) => {
        this.bundleSaveSuccess(actionClickArgs, bundle, response.message);
        this.bundleFormGroup.markAsPristine();
        this.bundleFormGroup.reset({
            defaultLimit: 5,
            algorithms: {
              algorithms: []
            }
          }
        );
      },
      () => {
        this.bundleSaveFail(actionClickArgs);
      });
  }

  private bundleSaveSuccess(actionClickArgs: ActionClickEventArgs, bundle: Bundle, notificationMsg: string): void {
    actionClickArgs.resolve();
    this.saveBundle.emit({
      data: bundle,
      isSuccess: true
    });
    this.notificationService.showNotification(notificationMsg, AlertType.SUCCESS);
  }

  private bundleSaveFail(actionClickArgs: ActionClickEventArgs): void {
    actionClickArgs.resolve();
    this.saveBundle.emit({
      isSuccess: false
    });
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.bundleFormGroup.get(controlName));
  }

  public onCancelClick() {
    this.cancelBundle.emit(this.bundleFormGroup.dirty);
  }
}