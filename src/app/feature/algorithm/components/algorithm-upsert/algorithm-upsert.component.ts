import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Algorithm } from '../../models';
import { SuccessResponse } from '../../../../core/models';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../../core/enums';
import { ActionType, FormAction } from 'src/app/shared/shared-common/enums';

import { NotificationService } from '../../../../core/services';
import { CustomFormValidator, FormValidator } from '../../../../shared/shared-common/services';
import { AlgorithmService } from '../../../../shared/shared-algorithm/services';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

import { AlgorithmConstants } from '../../algorithm.constants';

/**
 * Component class for showing algorithm upsert view.
 * AlgorithmUpsertComponent
 */
@Component({
  selector: 'app-algorithm-upsert',
  styleUrls: ['./algorithm-upsert.component.scss'],
  templateUrl: './algorithm-upsert.component.html'
})
export class AlgorithmUpsertComponent implements OnInit {
  public ActionType = ActionType;
  public actionBreadcrumb: ActionBreadcrumb[];

  public algorithmForm: FormGroup;
  public algorithm: Algorithm;
  public formAction: FormAction;
  public isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private algorithmService: AlgorithmService,
    private dialogService: ConfirmDialogService,
    private notificationService: NotificationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'algorithms/list',
        title: 'Algorithms'
      }
    ];
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.route.data.subscribe((data: { algorithm: Algorithm; formAction: FormAction }) => {
      if (data.algorithm) {
        this.algorithm = data.algorithm;
      }

      this.formAction = data.formAction;
      switch (this.formAction) {
        case FormAction.EDIT:
          this.isEdit = true;
          if (!this.algorithm) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `algorithms/edit/${this.algorithm.id}`,
            title: 'Edit Algorithm'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'algorithms/add',
            title: 'Add New Algorithm'
          });
          break;
      }
    });
    this.buildFormGroup();
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.algorithmForm.get(controlName));
  }

  /**
   * On save click event handler.
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  public onSaveClick(actionClickArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.algorithmForm);

    if (this.algorithmForm.invalid) {
      actionClickArgs.resolve();
      this.notificationService.showNotification(AlgorithmConstants.algorithm_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formValue = this.algorithmForm.value;
    const algorithm: Algorithm = {
      id: formValue.algorithmId,
      name: formValue.algorithmName,
      description: formValue.description,
      defaultDisplayText: formValue.displayText,
    };

    switch (this.formAction) {
      case FormAction.ADD:
        this.addNewAlgorithm(algorithm, actionClickArgs);
        break;
      case FormAction.EDIT:
        this.editAlgorithm(algorithm, actionClickArgs);
        break;
    }
  }

  /**
   * Responsible for redirect to algorithms view page.
   */
  public redirectToAlgorithmView(): void {
    this.router.navigate(['algorithms']);
  }

  /**
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.algorithmForm.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }

  /**
   * Responsible for add new algorithm.
   * @param {Algorithm} algorithm details
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  private addNewAlgorithm(algorithm: Algorithm, actionClickArgs: ActionClickEventArgs): void {
    this.algorithmService.createAlgorithm(algorithm).subscribe(
      (response: SuccessResponse) => {
        actionClickArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.algorithmForm.markAsPristine();
        this.redirectToAlgorithmView();
      },
      (error) => {
        actionClickArgs.resolve();
      }
    );
  }

  /**
   * Responsible for edit an algorithm.
   * @param {Algorithm} algorithm details
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  private editAlgorithm(algorithm: Algorithm, actionClickArgs: ActionClickEventArgs): void {
    this.algorithmService.updateAlgorithm(algorithm).subscribe(
      (response: SuccessResponse) => {
        actionClickArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.algorithmForm.markAsPristine();
        this.redirectToAlgorithmView();
      },
      (error) => {
        actionClickArgs.resolve();
      }
    );
  }

  /**
   * Responsible for build form group.
   */
  private buildFormGroup(): void {
    if (this.algorithm) {
      this.algorithmForm = this.fb.group({
        algorithmId: [this.algorithm.id],
        algorithmName: [this.algorithm.name],
        description: [this.algorithm.description],
        displayText: [this.algorithm.defaultDisplayText]
      });
      return;
    }
    this.algorithmForm = this.fb.group({
      algorithmId: [null, Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          CustomFormValidator.regexPattern(CustomFormValidator.integer_regex)
        ]
      )],
      algorithmName: [null],
      description: [null],
      displayText: [null]
    });
  }
}
