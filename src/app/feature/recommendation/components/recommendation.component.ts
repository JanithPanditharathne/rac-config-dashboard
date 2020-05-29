import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataFetchMode, DataTableComponent } from 'ornamentum';

import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessResponse } from '../../../core/models';
import { Recommendation, DisplayRecommendation } from '../models';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../core/enums';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';

import { ConfirmPopupComponent } from '../../../shared/shared-common/components';

import { NotificationService } from '../../../core/services';
import { RecommendationService } from '../../../shared/shared-rec/services';

import { RecommendationConstants } from '../recommendation.constants';

/**
 * Class representing the Recommendation component.
 * @class RecommendationComponent.
 */
@Component({
  selector: 'app-recommendation',
  styleUrls: ['./recommendation.component.scss'],
  templateUrl: './recommendation.component.html'
})
export class RecommendationComponent {
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;

  public isLoading = false;
  public height: number;
  public dataTable: DataTableComponent;
  public actionBreadcrumb: ActionBreadcrumb[];
  public dataSource: Observable<Recommendation[]>;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private recommendationService: RecommendationService,
  ) {
    this.actionBreadcrumb = [
      {
        path: 'recommendations',
        title: 'Recommendations'
      }
    ];

    this.dataSource = this.recommendationService.getRecs().pipe(
      map((data: DisplayRecommendation) => {
        return data.recs;
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
   * Recommendation add new event handler.
   */
  public onAddClick(): void {
    this.router.navigate(['recommendations/add']).catch((e) => {
      this.notificationService.showNotification(RecommendationConstants.navigation_failure, AlertType.ERROR);
    });
  }

  /**
   * Data table init event handler.
   * @param {DataTableComponent} dataTableComponent
   */
  public onDataTableInit(dataTableComponent: DataTableComponent): void {
    this.dataTable = dataTableComponent;
  }

  /**
   * On edit click event handler.
   * @param {string} recId rec id.
   */
  public onEditClick(recId: string): void {
    this.isLoading = true;
    this.router
      .navigate(['recommendations/edit', recId])
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
        this.notificationService.showNotification(RecommendationConstants.navigation_failure, AlertType.ERROR);
      });
  }

  /**
   * Responsible for open delete confirmation popup.
   * @param {string} recId rec id.
   * @param {string} recName rec name.
   */
  public openDeleteConfirmModal(recId: string, recName: string): void {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'recommendation-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = RecommendationConstants.recommendation_delete_title;
    modalRef.content.message = RecommendationConstants.recommendation_delete_message;
    modalRef.content.messageBody = `[${recId}] ${recName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = RecommendationConstants.recommendation_delete_action;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteRecommendation(recId, actionClickEventArgs);
    });
  }

  /**
   * Recommendation delete event handler.
   * @param {string} recId rec id.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
   */
  private deleteRecommendation(recId: string, actionClickEventArgs: ActionClickEventArgs): void {
    this.recommendationService.deleteRec(recId).subscribe(
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
