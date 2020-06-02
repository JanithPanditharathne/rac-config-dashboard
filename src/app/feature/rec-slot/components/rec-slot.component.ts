import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { DataFetchMode, DataTableComponent, DataTableRow } from 'ornamentum';

import { RecSlot, DisplayRecSlot } from '../models';
import { SuccessResponse } from '../../../core/models';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions, DropDownDataItem } from '../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../core/enums';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';

import { ConfirmPopupComponent } from '../../../shared/shared-common/components';

import { RecSlotsService } from '../services';
import { NotificationService } from '../../../core/services';

import { RecSlotConstants } from '../rec-slot.constants';

/**
 * Class representing the Rec slot component.
 * @class RecSlotComponent.
 */
@Component({
  selector: 'app-rec-slot',
  styleUrls: ['./rec-slot.component.scss'],
  templateUrl: './rec-slot.component.html'
})
export class RecSlotComponent {
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;
  public actionBreadcrumb: ActionBreadcrumb[];

  public height: number;
  public isLoading = false;
  public dataTable: DataTableComponent;
  public dataSource: Observable<RecSlot[]>;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private recSlotsService: RecSlotsService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rec-slots',
        title: 'Rec Slots'
      }
    ];

    this.dataSource = this.recSlotsService.getRecSlots().pipe(
      map((data: DisplayRecSlot) => {
        return data.recSlots;
      })
    );
  }

  /**
   * Algorithm add new event handler.
   */
  public onAddClick(): void {
    this.router.navigate(['rec-slots/add']).catch((e) => {
      this.notificationService.showNotification(RecSlotConstants.navigation_failure, AlertType.ERROR);
    });
  }

  /**
   * Responsive data table height event handler.
   * @param {ContainerDimensions} dimensions Table container dimensions.
   */
  public containerResponsive(dimensions: ContainerDimensions): void {
    this.height = dimensions.height;
  }

  /**
   * Set on dynamic row span extract event handler.
   * @param {DataTableRow<any>} row data row
   */
  public onDynamicRowSpanExtract(row: DataTableRow<any>): number {
    if (row.item.rules && row.item.rules.length) {
      return row.item.rules.length;
    }

    return 1;
  }

  /**
   * Data table init event handler.
   * @param {DataTableComponent} dataTableComponent
   */
  public onDataTableInit(dataTableComponent: DataTableComponent): void {
    this.dataTable = dataTableComponent;
  }

  /**
   * Responsible for map row data to filter options.
   * @param {RecSlot} item data row
   * @return {any} any
   */
  public onRuleFilterMapper(item: RecSlot): any {
    if (!item.rules) {
      return {
        key: null,
        value: '-'
      };
    }

    return item.rules.map((rule: DropDownDataItem) => {
      return {
        key: rule.name,
        value: rule.name
      };
    });
  }

  /**
   * Responsible for filter rule names.
   * @param {RecSlot} item data row
   * @param {string} field
   * @param {filterValue} filterValue
   */
  public onRuleOptionFilter(item: RecSlot, field: string, filterValue: string): boolean {
    if (!filterValue || !filterValue.length) {
      return true;
    }

    for (let index = 0; index < filterValue.length; index++) {
      if (!!item.rules.find((rule: DropDownDataItem) => rule.name.toLowerCase().includes(filterValue.toLowerCase()))) {
        return true;
      }

      if (status) {
        return true;
      }
    }

    return false;
  }

  /**
   * On edit click event handler.
   * @param {string} recSlotId rec slot id.
   */
  public onEditClick(recSlotId: string): void {
    this.isLoading = true;
    this.router
      .navigate(['rec-slots/edit', recSlotId])
      .then(
        () => {
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      )
      .catch(() => {
        this.isLoading = false;
        this.notificationService.showNotification(RecSlotConstants.navigation_failure, AlertType.ERROR);
      });
  }

  /**
   * Responsible for open delete confirmation popup.
   * @param {string} recSlotId rec slot id.
   */
  public openDeleteConfirmModal(recSlotId: string): void {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'rec-slot-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = RecSlotConstants.rec_slot_delete_title;
    modalRef.content.message = RecSlotConstants.rec_slot_delete_message;
    modalRef.content.messageBody = `Rec slot [${recSlotId}]`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = RecSlotConstants.rec_slot_delete_action;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteRecSlot(recSlotId, actionClickEventArgs);
    });
  }

  /**
   * Responsible to find and return rule name.
   * @param {any} item
   * @param {number} index
   * @param {field} field name
   */
  public getRuleName(item: any, index: number, field: string) {
    return item.rules && item.rules[index] ? item.rules[index][field] : '-';
  }

  /**
   * Rec slot delete event handler.
   * @param {string} recSlotId rec slot id.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
   */
  private deleteRecSlot(recSlotId: string, actionClickEventArgs: ActionClickEventArgs): void {
    this.recSlotsService.deleteRecSlot(recSlotId).subscribe(
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
