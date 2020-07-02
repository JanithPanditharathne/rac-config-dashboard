import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataFetchMode, DataTableComponent } from 'ornamentum';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Bundle } from '../models/bundle.model';
import { SuccessResponse } from '../../../core/models';
import { DisplayBundle } from '../models/display-bundle.model';
import { ActionBreadcrumb, ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../core/enums';
import { ActionType, ColumnActionType } from 'src/app/shared/shared-common/enums'; // NOSONAR

import { ConfirmPopupComponent } from '../../../shared/shared-common/components';

import { NotificationService } from '../../../core/services';
import { BundleService } from '../../../shared/shared-bundle/services';

import { BundleConstants } from '../bundle.constants';
import { AlgorithmConstants } from '../../algorithm/algorithm.constants';

/**
 * Class representing the Bundle component.
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

  public height: number;
  public isLoading = false;
  public dataTable: DataTableComponent;
  public dataSource: Observable<Bundle[]>;

  constructor(
    private readonly bundleService: BundleService,
    private readonly router: Router,
    private readonly modalService: BsModalService,
    private readonly notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'bundles',
        title: 'Bundles'
      }
    ];

    this.dataSource = this.bundleService.getBundles().pipe(
      map((data: DisplayBundle) => {
        return data.bundles;
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
   * On edit click event handler.
   * @param {string} bundleId bundle id.
   */
  public onEditClick(bundleId: string): void {
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
        this.notificationService.showNotification(BundleConstants.navigationFailure, AlertType.ERROR);
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
   * Responsible for open delete confirmation popup.
   * @param {string} bundleId bundle id.
   * @param {string} bundleName bundle name.
   */
  public openDeleteConfirmModal(bundleId: string, bundleName: string): void {
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'bundle-delete-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = BundleConstants.bundleDeleteTitle;
    modalRef.content.message = BundleConstants.bundleDeleteMessage;
    modalRef.content.messageBody = `[${bundleId}] ${bundleName}`;
    modalRef.content.actionType = ActionType.DELETE;
    modalRef.content.actionName = BundleConstants.bundleDeleteAction;
    modalRef.content.autoResolve = false;
    modalRef.content.onSubmit.subscribe((actionClickEventArgs: ActionClickEventArgs) => {
      this.deleteAlgorithm(bundleId, actionClickEventArgs);
    });
  }

  /**
   * Bundle add new event handler.
   */
  public onAddClick(): void {
    this.router.navigate(['bundles/add']).catch(() => {
      this.notificationService.showNotification(AlgorithmConstants.navigationFailure, AlertType.ERROR);
    });
  }

  /**
   * Bundle delete event handler.
   * @param {string} bundleId bundle id.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
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
}
