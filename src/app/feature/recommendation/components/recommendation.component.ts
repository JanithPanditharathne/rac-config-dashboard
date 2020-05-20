import { Component } from '@angular/core';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';
import { DataFetchMode, DataTableComponent } from 'ornamentum';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation.model';
import { map } from 'rxjs/operators';
import { DisplayRecommendation } from '../models/display-recommendation.model';
import { AlertType, SuccessStatus } from '../../../core/enums';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services';
import { RecommendationConstants } from '../recommendation.constants';
import { ConfirmPopupComponent } from '../../../shared/shared-common/components';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SuccessResponse } from '../../../core/models';
import { RecommendationService } from '../../../shared/shared-rec/services';

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
  public dataSource: Observable<Recommendation[]>;

  public actionBreadcrumb: ActionBreadcrumb[];
  private dataTable: DataTableComponent;

  constructor(
    private recommendationService: RecommendationService,
    private router: Router,
    private modalService: BsModalService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'recommendations',
        title: 'Recommendations'
      }
    ];

    this.dataSource = this.recommendationService.getRecs().pipe(
      map((data: DisplayRecommendation) => {
        return data.recs.map((recommendation: Recommendation) => {
          return recommendation;
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

  public onAddClick(): void {
    this.router.navigate(['recommendations/add']).catch((e) => {
      this.notificationService.showNotification(RecommendationConstants.navigation_failure, AlertType.ERROR);
    });
  }

  public onDataTableInit(dataTableComponent: DataTableComponent) {
    this.dataTable = dataTableComponent;
  }

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

  private deleteRecommendation(recId: string, actionClickEventArgs: ActionClickEventArgs) {
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
