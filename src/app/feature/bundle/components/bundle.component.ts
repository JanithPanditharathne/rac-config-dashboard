import { Component } from '@angular/core';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums';
import { DataFetchMode, DataTableComponent } from 'ornamentum';
import { Observable } from 'rxjs';
import { Bundle } from '../models/bundle.model';
import { map } from 'rxjs/operators';
import { DisplayBundle } from '../models/display-bundle.model';
import { BundleService } from '../../../shared/shared-bundle/services';
import { AlgorithmConstants } from '../../algorithm/algorithm.constants';
import { AlertType, SuccessStatus } from '../../../core/enums';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services';
import { BundleConstants } from '../bundle.constants';
import { ConfirmPopupComponent } from '../../../shared/shared-common/components';
import { SuccessResponse } from '../../../core/models';
import { BsModalService } from 'ngx-bootstrap/modal';

/**
 * Class representing the Bundles component.
 * @implements OnDestroy
 * @class BundleComponent.
 */
@Component({
  selector: 'app-bundle',
  styleUrls: ['./bundle.component.scss'],
  templateUrl: './bundle.component.html'
})
export class BundleComponent {
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;

  public actionBreadcrumb: ActionBreadcrumb[];
  public isLoading = false;
  public height: number;
  private dataTable: DataTableComponent;
  public dataSource: Observable<Bundle[]>;

  constructor(
    private bundleService: BundleService,
    private router: Router,
    private modalService: BsModalService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'bundles',
        title: 'Bundles'
      }
    ];

    this.dataSource = this.bundleService.getBundles().pipe(
      map((data: DisplayBundle) => {
        return data.bundles.map((bundle: Bundle) => {
          return bundle;
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

  public onEditClick(bundleId: string) {
    this.isLoading = true;
    this.router
      .navigate(['bundles/edit', bundleId])
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
        this.notificationService.showNotification(BundleConstants.navigation_failure, AlertType.ERROR);
      });
  }

  public onDataTableInit(dataTableComponent: DataTableComponent) {
    this.dataTable = dataTableComponent;
  }

  public openDeleteConfirmModal(bundleId: string, bundleName: string) {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'bundle-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = BundleConstants.bundle_delete_title;
    modalRef.content.message = BundleConstants.bundle_delete_message;
    modalRef.content.messageBody = `[${bundleId}] ${bundleName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = BundleConstants.bundle_delete_action;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteAlgorithm(bundleId, actionClickEventArgs);
    });
  }

  /**
   * Bundle delete event handler.
   */
  private deleteAlgorithm(bundleId: string, actionClickEventArgs: ActionClickEventArgs): void {
    this.bundleService.deleteBundle(bundleId).subscribe(
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
   * Bundle add new event handler.
   */
  public onAddClick() {
    this.router.navigate(['bundles/add']).catch(() => {
      this.notificationService.showNotification(AlgorithmConstants.navigation_failure, AlertType.ERROR);
    });
  }
}
