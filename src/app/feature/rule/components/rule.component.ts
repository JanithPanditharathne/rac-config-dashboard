import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { DataFetchMode, DataTableComponent } from 'ornamentum';

import { Rule, DisplayRule } from '../models';
import { SuccessResponse } from '../../../core/models';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../core/enums';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';

import { ConfirmPopupComponent } from '../../../shared/shared-common/components';

import { NotificationService } from '../../../core/services';
import { RuleService } from '../../../shared/shared-rules/services';

import { RuleConstants } from '../rule.constants';

/**
 * Class representing the Rule component.
 * @class RuleComponent.
 */
@Component({
  selector: 'app-rule',
  styleUrls: ['./rule.component.scss'],
  templateUrl: './rule.component.html'
})
export class RuleComponent {
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;

  public height: number;
  public isLoading = false;
  public dataTable: DataTableComponent;
  public rulesDataSource: Observable<Rule[]>;
  public actionBreadcrumb: ActionBreadcrumb[];

  constructor(
    private readonly router: Router,
    private readonly ruleService: RuleService,
    private readonly modalService: BsModalService,
    private readonly notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rules',
        title: 'Rules'
      }
    ];

    this.rulesDataSource = this.ruleService.getRules().pipe(
      map((data: DisplayRule) => {
        return data.rules;
      })
    );
  }

  /**
   * Responsive data table height event handler.
   * @param {ContainerDimensions} dimensions Table container dimensions.
   */
  public containerResponsive(dimensions: ContainerDimensions): void {
    this.height = dimensions.height;
  }

  /**
   * Algorithm add new event handler.
   */
  public onAddClick(): void {
    this.router.navigate(['rules/add']).catch((e) => {
      this.notificationService.showNotification(RuleConstants.navigation_failure, AlertType.ERROR);
    });
  }

  /**
   * On edit click event handler.
   * @param {string} ruleId rule id.
   */
  public onEditClick(ruleId: string) {
    this.isLoading = true;
    this.router
      .navigate(['rules/edit', ruleId])
      .then(
        (e) => {
          this.isLoading = false;
        },
        (e) => {
          this.isLoading = false;
        }
      )
      .catch(() => {
        this.isLoading = false;
        this.notificationService.showNotification(RuleConstants.navigation_failure, AlertType.ERROR);
      });
  }

  /**
   * Responsible for open delete confirmation popup.
   * @param {string} ruleId rule id.
   * @param {string} ruleName rule name.
   */
  public openDeleteConfirmModal(ruleId: string, ruleName: string) {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'rule-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = RuleConstants.rule_delete_title;
    modalRef.content.message = RuleConstants.rule_delete_message;
    modalRef.content.messageBody = `[${ruleId}] ${ruleName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = RuleConstants.rule_delete_action;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteRule(ruleId, actionClickEventArgs);
    });
  }

  /**
   * Data table init event handler.
   * @param {DataTableComponent} dataTable
   */
  public onDataTableInit(dataTable: DataTableComponent) {
    this.dataTable = dataTable;
  }

  /**
   * Responsible for map row data to filter options.
   * @param {Rule} item data row
   * @return {any} any
   */
  public onIsGlobalFilterMapper(item: Rule): any {
    return {
      key: item.isGlobal,
      value: item.isGlobal ? 'Yes' : 'No'
    };
  }

  /**
   * Rule delete event handler.
   * @param {string} ruleId rule id.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
   */
  private deleteRule(ruleId: string, actionClickEventArgs: ActionClickEventArgs): void {
    this.ruleService.deleteRule(ruleId).subscribe(
      (response: SuccessResponse) => {
        actionClickEventArgs.resolve();
        this.dataTable.fetchData(DataFetchMode.SOFT_RELOAD);
        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }

        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
      },
      () => {
        actionClickEventArgs.resolve();
      }
    );
  }
}
