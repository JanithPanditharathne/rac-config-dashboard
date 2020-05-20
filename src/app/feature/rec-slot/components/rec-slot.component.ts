import { Component } from '@angular/core';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';
import { DataFetchMode, DataTableComponent, DataTableRow } from 'ornamentum';
import { Observable } from 'rxjs';
import { RecSlot } from '../models/rec-slot.model';
import { map } from 'rxjs/operators';
import { RecSlotsService } from '../services';
import { DisplayRecSlots } from '../models/display-rec-slots.model';
import { AlertType, SuccessStatus } from '../../../core/enums';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services';
import { RecSlotConstants } from '../rec-slot.constants';
import { ConfirmPopupComponent } from '../../../shared/shared-common/components';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessResponse } from '../../../core/models';

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

  public isLoading = false;
  public height: number;
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
      map((data: DisplayRecSlots) => {
        return data.recSlots.map((recSlot: RecSlot) => {
          return recSlot;
        });
      })
    );
  }

  /**
   * Algorithm add new event handler.
   */
  public onAddClick() {
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

  public onDynamicRowSpanExtract(row: DataTableRow<any>): number {
    if (row.item.rules && row.item.rules.length) {
      return row.item.rules.length;
    }

    return 1;
  }

  public onDataTableInit(dataTableComponent: DataTableComponent) {
    this.dataTable = dataTableComponent;
  }

  public onEditClick(recSlotId: string) {
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

  public openDeleteConfirmModal(recSlotId: string) {
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

  public getRuleName(item: any, index: number, field: string) {
    return item.rules && item.rules[index] ? item.rules[index][field] : '-';
  }

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
