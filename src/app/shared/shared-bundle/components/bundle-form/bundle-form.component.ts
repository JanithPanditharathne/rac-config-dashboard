import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SuccessResponse } from '../../../../core/models';
import { Bundle } from '../../../../feature/bundle/models/bundle.model';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../shared-common/models';
import { BundleSaveEventArgs } from '../../../../feature/bundle/models/bundle-save-event-args.model';

import { AlertType } from '../../../../core/enums';
import { FormAction, ActionType } from 'src/app/shared/shared-common/enums';

import { AlgorithmSelectorComponent } from '../../../shared-algorithm/components';

import { BundleService } from '../../services';
import { NotificationService } from '../../../../core/services';
import { AlgorithmUtilityService } from '../../../shared-algorithm/services';
import { CustomFormValidator, FormValidator } from '../../../shared-common/services';

import { SharedBundleConstants } from '../../shared-bundle.constants';
import { SharedCommonConstants } from 'src/app/shared/shared-common/shared-common.constants';

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
  public SharedCommonConstants = SharedCommonConstants;
  public SharedBundleConstants = SharedBundleConstants;
  public actionBreadcrumb: ActionBreadcrumb[];

  public isEdit: boolean;
  public bundleId: string;
  public bundleFormGroup: FormGroup;

  @Input()
  public bundle: Bundle;

  @Input()
  public isPopupView: boolean;

  @Input()
  public formAction: FormAction;

  @Output()
  public saveBundle: EventEmitter<BundleSaveEventArgs> = new EventEmitter<BundleSaveEventArgs>();

  @Output()
  public cancelBundle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly bundleService: BundleService,
    private readonly notificationService: NotificationService
  ) {
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    if (this.bundle) {
      this.bundleId = this.bundle.id;
      this.isEdit = true;
    }
    this.initBundleFormGroup();
    this.onCombinedEnabledChange();
    this.onDefaultLimitEnabledChange();
  }

  /**
   * Save click event handler.
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
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

  /**
   * Combine enabled changed event handler.
   */
  public onCombinedEnabledChange(): void {
    const isCombineEnabled = this.bundleFormGroup.get('combineEnabled').value;
    if (isCombineEnabled) {
      FormValidator.setControlValidators(this.bundleFormGroup.get('combineDisplayText'), CustomFormValidator.noWhitespaceValidator());
    } else {
      FormValidator.clearControlValidators(this.bundleFormGroup.get('combineDisplayText'));
    }
  }

  /**
   * Default limit enabled changed event handler.
   */
  public onDefaultLimitEnabledChange(): void {
    const isDefaultLimitEnabled = this.bundleFormGroup.get('defaultLimitEnabled').value;
    if (isDefaultLimitEnabled) {
      FormValidator.setControlValidators(this.bundleFormGroup.get('defaultLimit'),
        Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.max(999),
            CustomFormValidator.regexPattern(CustomFormValidator.integer_regex)
          ]
        ));
    } else {
      FormValidator.clearControlValidators(this.bundleFormGroup.get('defaultLimit'));
    }
  }

  /**
   * Add bundle event handler.
   * @param {Bundle} bundle
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  public addNewBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs): void {
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

  /**
   * Edit bundle event handler.
   * @param {Bundle} bundle
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  public editBundle(bundle: Bundle, actionClickArgs: ActionClickEventArgs): void {
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

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.bundleFormGroup.get(controlName));
  }

  /**
   * Cancel click event handler.
   */
  public onCancelClick(): void {
    this.cancelBundle.emit(this.bundleFormGroup.dirty);
  }

  /**
   * Bundle save success event handler.
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   * @param {Bundle} bundle
   * @param {string} notificationMsg message
   */
  private bundleSaveSuccess(actionClickArgs: ActionClickEventArgs, bundle: Bundle, notificationMsg: string): void {
    actionClickArgs.resolve();
    this.saveBundle.emit({
      data: bundle,
      isSuccess: true
    });
    this.notificationService.showNotification(notificationMsg, AlertType.SUCCESS);
  }

  /**
   * Bundle save failed event handler.
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  private bundleSaveFail(actionClickArgs: ActionClickEventArgs): void {
    actionClickArgs.resolve();
    this.saveBundle.emit({
      isSuccess: false
    });
  }

  /**
   * Responsible for build form group.
   */
  private initBundleFormGroup(): void {
    if (this.bundle) {
      this.bundleFormGroup = this.fb.group({
        bundleId: [this.bundle.id],
        bundleName: [this.bundle.name],
        combineEnabled: [this.bundle.combineEnabled],
        combineDisplayText: [this.bundle.combineDisplayText],
        defaultLimitEnabled: [this.bundle.defaultLimit > 0],
        defaultLimit: [
          this.bundle.defaultLimit ? this.bundle.defaultLimit : 5,
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
      bundleId: [null],
      bundleName: [null],
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
}
