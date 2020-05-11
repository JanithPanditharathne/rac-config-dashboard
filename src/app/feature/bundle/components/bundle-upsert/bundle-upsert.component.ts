import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAction, ActionType } from '../../../../shared/shared-common/enums';
import { Bundle } from '../../models/bundle.model';
import { ActionBreadcrumb } from '../../../../shared/shared-common/models';
import { FormBuilder } from '@angular/forms';
import { BundleSaveEventArgs } from '../../models/bundle-save-event-args.model';
import { BundleFormComponent } from '../../../../shared/shared-bundle/components';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

/**
 * Class representing bundle add new and edit components.
 * @implements OnInit
 * @class BundleUpsertComponent.
 */
@Component({
  selector: 'app-bundle-upsert',
  styleUrls: ['./bundle-upsert.component.scss'],
  templateUrl: './bundle-upsert.component.html'
})
export class BundleUpsertComponent implements OnInit {
  public ActionType = ActionType;
  public FormAction = FormAction;
  public actionBreadcrumb: ActionBreadcrumb[];

  private bundle: Bundle;
  private bundleFormAction: FormAction;

  @ViewChild(BundleFormComponent, {static: true})
  public bundleFormComponent: BundleFormComponent;

  constructor(
    protected fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: ConfirmDialogService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'bundles/list',
        title: 'Bundles'
      }
    ];
  }

  /**
   * On component init.
   */
  public ngOnInit(): void {
    this.route.data.subscribe((data: { bundle: Bundle; formAction: FormAction }) => {
      if (data.bundle) {
        this.bundle = data.bundle;
      }

      this.bundleFormAction = data.formAction;
      switch (this.bundleFormAction) {
        case FormAction.EDIT:
          if (!this.bundle) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `bundles/edit/${this.bundle.id}`,
            title: 'Edit Bundle'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'bundles/add',
            title: 'Add New Bundle'
          });
          break;
      }
    });
  }

  public redirectToBundlePage(): void {
    this.router.navigate(['bundles']);
  }

  /**
   * Event handler for cancel button click.
   */
  public onCancelClick(): void {
    this.redirectToBundlePage();
  }

  /**
   * Event handler for save button click.
   * @param {boolean} saveArgs Action arguments.
   */
  public onSaveClick(saveArgs: BundleSaveEventArgs) {
    if (saveArgs.isSuccess) {
      this.redirectToBundlePage();
    }
  }

  /**
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.bundleFormComponent.bundleFormGroup.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }
}
