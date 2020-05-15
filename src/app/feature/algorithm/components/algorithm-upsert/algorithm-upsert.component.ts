import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionBreadcrumb, ActionClickEventArgs } from '../../../../shared/shared-common/models';
import { FormValidator } from '../../../../shared/shared-common/services';
import { ActionType, FormAction } from 'src/app/shared/shared-common/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Algorithm } from '../../models/algorithm.model';
import { NotificationService } from '../../../../core/services';
import { AlgorithmConstants } from '../../algorithm.constants';
import { AlertType, SuccessStatus } from '../../../../core/enums';
import { SuccessResponse } from '../../../../core/models';
import { AlgorithmService } from '../../../../shared/shared-algorithm/services';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

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

  public algorithmForm: FormGroup;
  public algorithm: Algorithm;
  public formAction: FormAction;
  public isEdit = false;

  public actionBreadcrumb: ActionBreadcrumb[];

  constructor(
    private algorithmService: AlgorithmService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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

  private buildFormGroup(): void {
    if (this.algorithm) {
      this.algorithmForm = this.fb.group({
        algorithmId: [this.algorithm.id, Validators.required],
        algorithmName: [this.algorithm.name, Validators.required],
        description: [this.algorithm.description, Validators.required],
        displayText: [this.algorithm.defaultDisplayText, Validators.required]
      });
      return;
    }
    this.algorithmForm = this.fb.group({
      algorithmId: [null, Validators.required],
      algorithmName: [null, Validators.required],
      description: [null, Validators.required],
      displayText: [null, Validators.required]
    });
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.algorithmForm.get(controlName));
  }

  public onSaveClick(actionClickArgs: ActionClickEventArgs) {
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

  public addNewAlgorithm(algorithm: Algorithm, actionClickArgs: ActionClickEventArgs): void {
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

  public editAlgorithm(algorithm: Algorithm, actionClickArgs: ActionClickEventArgs): void {
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
}
