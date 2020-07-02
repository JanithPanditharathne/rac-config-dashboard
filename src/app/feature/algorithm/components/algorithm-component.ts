import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { DataFetchMode, DataTableComponent } from 'ornamentum';

import { BsModalService } from 'ngx-bootstrap/modal';

import { SuccessResponse } from '../../../core/models';
import { Algorithm, DisplayAlgorithm } from '../models';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../core/enums';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums'; // NOSONAR

import { ConfirmPopupComponent } from '../../../shared/shared-common/components';

import { NotificationService } from '../../../core/services';
import { AlgorithmService } from '../../../shared/shared-algorithm/services';

import { AlgorithmConstants } from '../algorithm.constants';

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

  public dataSource: Observable<Algorithm[]>;
  private dataTable: DataTableComponent;
  public isLoading = false;
  public height: number;

  constructor(
    private readonly router: Router,
    private readonly modalService: BsModalService,
    private readonly algorithmService: AlgorithmService,
    private readonly notificationService: NotificationService
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

  /**
   * On edit click event handler.
   * @param {string} algorithmId algorithm id.
   */
  public onEditClick(algorithmId: string): void {
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
        this.notificationService.showNotification(AlgorithmConstants.navigationFailure, AlertType.ERROR);
      });
  }

  /**
   * Responsible for open delete confirmation popup.
   * @param {string} algorithmId algorithm id.
   * @param {string} algorithmName algorithm name.
   */
  public openDeleteConfirmModal(algorithmId: string, algorithmName: string): void {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'algorithm-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = AlgorithmConstants.algorithmDeleteTitle;
    modalRef.content.message = AlgorithmConstants.algorithmDeleteMessage;
    modalRef.content.messageBody = `[${algorithmId}] ${algorithmName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = AlgorithmConstants.algorithmDeleteAction;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteAlgorithm(algorithmId, actionClickEventArgs);
    });
  }

  /**
   * Algorithm add new event handler.
   */
  public onAddClick(): void {
    this.router.navigate(['algorithms/add']).catch(() => {
      this.notificationService.showNotification(AlgorithmConstants.navigationFailure, AlertType.ERROR);
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
   * Data table init event handler.
   * @param {DataTableComponent} dataTableComponent
   */
  public onDataTableInit(dataTableComponent: DataTableComponent): void {
    this.dataTable = dataTableComponent;
  }

  /**
   * Algorithm delete event handler.
   * @param {string} algorithmId algorithm id.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
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

}
