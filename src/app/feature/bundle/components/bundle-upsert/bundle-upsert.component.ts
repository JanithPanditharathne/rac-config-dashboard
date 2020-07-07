import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Bundle } from '../../models/bundle.model';
import { BundleSaveEventArgs } from '../../models/bundle-save-event-args.model';
import { ActionBreadcrumb } from '../../../../shared/shared-common/models';

import { FormAction, ActionType } from '../../../../shared/shared-common/enums';

import { BundleFormComponent } from '../../../../shared/shared-bundle/components';

import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

/**
 * Class representing bundle add new and edit components.
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

  public bundle: Bundle;
  public bundleFormAction: FormAction;

  @ViewChild(BundleFormComponent, {static: true})
  public bundleFormComponent: BundleFormComponent;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly dialogService: ConfirmDialogService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'bundles/list',
        title: 'Bundles'
      }
    ];
  }

  /**
   * OnInit event handler.
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

  /**
   * Responsible for redirect to bundles view page.
   */
  public redirectToBundlePage(): void {
    this.router.navigate(['bundles']);
  }

  /**
   * Event handler for save button click.
   * @param {BundleSaveEventArgs} saveArgs action arguments.
   */
  public onSaveClick(saveArgs: BundleSaveEventArgs): void {
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
