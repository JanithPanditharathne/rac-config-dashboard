import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DropdownSelectMode } from 'ornamentum';

import { Observable } from 'rxjs';

import { Rule } from '../../models';
import { SuccessResponse } from '../../../../core/models';
import { ActionBreadcrumb, ActionClickEventArgs, DropDownDataItem } from '../../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../../core/enums';
import { RuleGeneratorType } from 'src/app/shared/shared-rules/enums'; // NOSONAR
import { ActionType, FormAction } from 'src/app/shared/shared-common/enums'; // NOSONAR

import { NotificationService } from '../../../../core/services';
import { RuleContextFormUtility, RuleService, RuleUtilityService } from '../../../../shared/shared-rules/services';
import { CustomFormValidator, FormValidator } from '../../../../shared/shared-common/services';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

import { RuleConstants } from '../../rule.constants';
import { SharedCommonConstants } from 'src/app/shared/shared-common/shared-common.constants'; // NOSONAR

/**
 * Class representing the Rule component.
 * @class RuleComponent.
 */

@Component({
  selector: 'app-rule-upsert',
  styleUrls: ['./rule-upsert.component.scss'],
  templateUrl: './rule-upsert.component.html'
})
export class RuleUpsertComponent implements OnInit {
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public RuleGeneratorType = RuleGeneratorType;
  public SharedCommonConstants = SharedCommonConstants;
  public ActionType = ActionType;
  public FormAction = FormAction;

  public rule: Rule;
  public isEdit: boolean;
  public ruleForm: FormGroup;
  public formAction: FormAction;
  public actionBreadcrumb: ActionBreadcrumb[];
  public ruleTypeDropdownData: DropDownDataItem[];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly ruleService: RuleService,
    private readonly dialogService: ConfirmDialogService,
    private readonly ruleUtilityService: RuleUtilityService,
    private readonly notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rules/list',
        title: 'Rules'
      }
    ];

    this.ruleTypeDropdownData = ruleUtilityService.ruleTypes;
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.route.data.subscribe((data: { rule: Rule; formAction: FormAction }) => {
      if (data.rule) {
        this.rule = data.rule;
        this.isEdit = true;
      }

      this.formAction = data.formAction;
      switch (this.formAction) {
        case FormAction.EDIT:
          if (!this.rule) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `rules/edit/${this.rule.id}`,
            title: 'Edit Rule'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'rules/add',
            title: 'Add New Rule'
          });
          break;
      }
    });
    this.buildFormGroup();
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.ruleForm.get(controlName));
  }

  /**
   * On save click event handler.
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  public onRecSaveClick(clickEventArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.ruleForm);

    if (this.ruleForm.invalid) {
      clickEventArgs.resolve();
      this.notificationService.showNotification(RuleConstants.ruleCreateInvalidForm, AlertType.ERROR);
      return;
    }

    const formValue = this.ruleForm.value;
    const rule: Rule = {
      name: formValue.ruleName,
      type: formValue.ruleType.name,
      isGlobal: formValue.isGlobal,
      matchingConditionJson: RuleContextFormUtility.setOperatorData(formValue.matching) || [],
      actionConditionJson: RuleContextFormUtility.setOperatorData(formValue.action)
    };

    switch (this.formAction) {
      case FormAction.ADD:
        this.addNewRule(rule, clickEventArgs);
        break;
      case FormAction.EDIT:
        this.editRule(rule, clickEventArgs);
        break;
    }
  }

  /**
   * Responsible for redirect to rules view page.
   */
  public redirectToRulesView(): void {
    this.router.navigate(['rules']);
  }

  /**
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.ruleForm.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }

  /**
   * Responsible for add new rule.
   * @param {Rule} rule details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private addNewRule(rule: Rule, clickEventArgs: ActionClickEventArgs): void {
    this.ruleService.createRule(rule).subscribe(
      (response: SuccessResponse) => {
        this.handleResponse(response, clickEventArgs);
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for edit a rule.
   * @param {Rule} rule details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private editRule(rule: Rule, clickEventArgs: ActionClickEventArgs): void {
    rule.id = this.rule.id;
    this.ruleService.updateRule(rule).subscribe(
      (response: SuccessResponse) => {
        this.handleResponse(response, clickEventArgs);
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for handle backend response.
   * @param {SuccessResponse} response
   * @param {ActionClickEventArgs} actionClickArgs
   */
  private handleResponse(response: SuccessResponse, actionClickArgs: ActionClickEventArgs): void {
    actionClickArgs.resolve();

    if (response.status === SuccessStatus.FAIL) {
      this.notificationService.showNotification(response.message, AlertType.ERROR);
      return;
    }
    this.notificationService.showNotification(response.message, AlertType.SUCCESS);
    this.ruleForm.markAsPristine();
    this.redirectToRulesView();
  }

  /**
   * Responsible for build form group.
   */
  private buildFormGroup(): void {
    if (this.rule) {
      this.ruleForm = this.fb.group({
        ruleId: [this.rule.id],
        ruleName: [this.rule.name],
        ruleType: [this.ruleUtilityService.mapRuleTypeDropdownData(this.rule.type), Validators.required],
        isGlobal: [this.rule.isGlobal],
        matching: this.fb.array([]),
        action: this.fb.array([], CustomFormValidator.arrayMinLength(1)),
      });
    } else {
      this.ruleForm = this.fb.group({
        ruleId: [null],
        ruleName: [null],
        ruleType: [null, Validators.required],
        isGlobal: [false],
        matching: this.fb.array([]),
        action: this.fb.array([], CustomFormValidator.arrayMinLength(1))
      });
    }
  }
}
