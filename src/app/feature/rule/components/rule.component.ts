import { Component } from '@angular/core';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';
import { Rule } from '../models/rule.model';
import { map } from 'rxjs/operators';
import { DisplayRule } from '../models/display-rule.model';
import { Observable } from 'rxjs';
import { RuleService } from '../../../shared/shared-rules/services';
import { AlertType, SuccessStatus } from '../../../core/enums';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services';
import { RuleConstants } from '../rule.constants';
import { ConfirmPopupComponent } from '../../../shared/shared-common/components';
import { SuccessResponse } from '../../../core/models';
import { DataFetchMode, DataTableComponent } from 'ornamentum';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  public isLoading = false;

  public actionBreadcrumb: ActionBreadcrumb[];
  private rulesDataSource: Observable<Rule[]>;
  private height: number;
  private dataTable: DataTableComponent;

  constructor(
    private router: Router,
    private ruleService: RuleService,
    private modalService: BsModalService,
    public notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rules',
        title: 'Rules'
      }
    ];

    this.rulesDataSource = this.ruleService.getRules().pipe(
      map((data: DisplayRule) => {
        return data.rules.map((rule: Rule) => {
          return rule;
        });
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

  public onAddClick() {
    this.router.navigate(['rules/add']).catch((e) => {
      this.notificationService.showNotification(RuleConstants.navigation_failure, AlertType.ERROR);
    });
  }

  public renderIsGlobal(item: Rule): string {
    return item.isGlobal ? 'Yes' : 'No';
  }

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
      this.deleteAlgorithm(ruleId, actionClickEventArgs);
    });
  }

  /**
   * Rule delete event handler.
   */
  private deleteAlgorithm(ruleId: string, actionClickEventArgs: ActionClickEventArgs): void {
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

  public onDataTableInit(dataTable: DataTableComponent) {
    this.dataTable = dataTable;
  }
}
