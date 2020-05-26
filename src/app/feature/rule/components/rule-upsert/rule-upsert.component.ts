import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionBreadcrumb, ActionClickEventArgs, DropDownDataItem } from '../../../../shared/shared-common/models';
import { CustomFormValidator, FormValidator } from '../../../../shared/shared-common/services';
import { DropdownSelectMode } from 'ornamentum';
import { ActionType, FormAction } from 'src/app/shared/shared-common/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Rule } from '../../models/rule.model';
import { RuleGeneratorType } from 'src/app/shared/shared-rules/enums';
import { AlertType, SuccessStatus } from '../../../../core/enums';
import { NotificationService } from '../../../../core/services';
import { RuleConstants } from '../../rule.constants';
import { SuccessResponse } from '../../../../core/models';
import { RuleService } from '../../../../shared/shared-rules/services';
import { RuleUtilityService } from '../../../../shared/shared-rules/services/rule-utility.service';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

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
  public ActionType = ActionType;
  public FormAction = FormAction;
  public RuleGeneratorType = RuleGeneratorType;
  public ruleForm: FormGroup;
  public actionBreadcrumb: ActionBreadcrumb[];
  public ruleTypeDropdownData: DropDownDataItem[];

  public formAction: FormAction;
  private rule: Rule;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ruleService: RuleService,
    private dialogService: ConfirmDialogService,
    private ruleUtilityService: RuleUtilityService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rules/list',
        title: 'Rules'
      }
    ];

    this.ruleTypeDropdownData = ruleUtilityService.ruleTypes;
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { rule: Rule; formAction: FormAction }) => {
      if (data.rule) {
        this.rule = data.rule;
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

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.ruleForm.get(controlName));
  }

  public onRecSaveClick(clickEventArgs: ActionClickEventArgs) {
    FormValidator.validateAllFormFields(this.ruleForm);

    if (this.ruleForm.invalid) {
      clickEventArgs.resolve();
      this.notificationService.showNotification(RuleConstants.rule_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formValue = this.ruleForm.value;
    const rule: Rule = {
      name: formValue.ruleName,
      type: formValue.ruleType.name,
      isGlobal: formValue.isGlobal,
      matchingConditionJson: formValue.matching || [],
      actionConditionJson: formValue.action
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

  public redirectToRulesView() {
    this.router.navigate(['rules']);
  }

  private buildFormGroup() {
    if (this.rule) {
      this.ruleForm = this.fb.group({
        ruleName: [this.rule.name, Validators.required],
        ruleType: [this.ruleUtilityService.mapRuleTypeDropdownData(this.rule.type), Validators.required],
        isGlobal: [this.rule.isGlobal],
        matching: this.fb.array([]),
        action: this.fb.array([], CustomFormValidator.arrayMinLength(1)),
      });
    } else {
      this.ruleForm = this.fb.group({
        ruleName: [null, Validators.required],
        ruleType: [null, Validators.required],
        isGlobal: [false],
        matching: this.fb.array([]),
        action: this.fb.array([], CustomFormValidator.arrayMinLength(1))
      });
    }
  }

  private addNewRule(rule: Rule, clickEventArgs: ActionClickEventArgs) {
    this.ruleService.createRule(rule).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.ruleForm.markAsPristine();
        this.redirectToRulesView();
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
  }

  private editRule(rule: Rule, clickEventArgs: ActionClickEventArgs) {
    this.ruleService.updateRule(rule).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.ruleForm.markAsPristine();
        this.redirectToRulesView();
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
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
}
