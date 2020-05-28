import { Component } from '@angular/core';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmPopupComponent } from '../../../shared/shared-common/components';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';
import { AlgorithmConstants } from '../algorithm.constants';
import { DataFetchMode, DataTableComponent } from 'ornamentum';
import { Observable } from 'rxjs';
import { Algorithm } from '../models/algorithm.model';
import { map } from 'rxjs/operators';
import { DisplayAlgorithm } from '../models/display-algorithm.model';
import { Router } from '@angular/router';
import { AlertType, SuccessStatus } from '../../../core/enums';
import { NotificationService } from '../../../core/services';
import { SuccessResponse } from '../../../core/models';
import { AlgorithmService } from '../../../shared/shared-algorithm/services';

/**
 * Class representing algorithm component.
 * @class AlgorithmComponent
 */

@Component({
  selector: 'app-algorithm',
  styleUrls: ['./algorithm-component.scss'],
  templateUrl: './algorithm-component.html'
})
export class AlgorithmComponent {
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;

  public actionBreadcrumb: ActionBreadcrumb[];
  public isLoading = false;
  public height: number;
  public dataSource: Observable<Algorithm[]>;

  private dataTable: DataTableComponent;

  constructor(
    private modalService: BsModalService,
    private algorithmService: AlgorithmService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'algorithms/list',
        title: 'Algorithms'
      }
    ];

    this.dataSource = this.algorithmService.getAlgorithms().pipe(
      map((data: DisplayAlgorithm) => {
          return data.algorithms;
      })
    );
  }

  public onEditClick(algorithmId: any): void {
    this.isLoading = true;
    this.router
      .navigate(['algorithms/edit', algorithmId])
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
        this.notificationService.showNotification(AlgorithmConstants.navigation_failure, AlertType.ERROR);
      });
  }

  public openDeleteConfirmModal(algorithmId: string, algorithmName: string) {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'algorithm-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = AlgorithmConstants.algorithm_delete_title;
    modalRef.content.message = AlgorithmConstants.algorithm_delete_message;
    modalRef.content.messageBody = `[${algorithmId}] ${algorithmName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = AlgorithmConstants.algorithm_delete_action;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteAlgorithm(algorithmId, actionClickEventArgs);
    });
  }

  /**
   * Algorithm delete event handler.
   */
  private deleteAlgorithm(algorithmId: string, actionClickEventArgs: ActionClickEventArgs): void {
    this.algorithmService.deleteAlgorithm(algorithmId).subscribe(
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

  /**
   * Algorithm add new event handler.
   */
  public onAddClick() {
    this.router.navigate(['algorithms/add']).catch(() => {
      this.notificationService.showNotification(AlgorithmConstants.navigation_failure, AlertType.ERROR);
    });
  }

  /**
   * Responsive data table height event handler.
   * @param {ContainerDimensions} dimensions Table container dimensions.
   */
  public containerResponsive(dimensions: ContainerDimensions): void {
    this.height = dimensions.height;
  }

  public onDataTableInit(dataTableComponent: DataTableComponent) {
    this.dataTable = dataTableComponent;
  }
}
