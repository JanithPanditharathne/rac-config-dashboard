import {Component, OnDestroy, TemplateRef} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Subject } from 'rxjs';

import { ActionClickEventArgs } from '../../../models';

import { ActionType } from '../../../enums';

/**
 * Class representing common confirm popup component.
 * @implements OnDestroy
 * @class ConfirmPopupComponent
 */
@Component({
  selector: 'app-confirm-popup',
  styleUrls: ['./confirm-popup.component.scss'],
  templateUrl: './confirm-popup.component.html'
})
export class ConfirmPopupComponent implements OnDestroy {
  public ActionType = ActionType;

  public title: string;
  public message: string;
  public messageBody: string;
  public messageBodyTemplate: TemplateRef<any>;
  public actionType: ActionType;
  public actionName: string;
  public autoResolve = true;

  public onSubmit = new Subject<ActionClickEventArgs>();
  public onCancel = new Subject<void>();

  constructor(public modalRef: BsModalRef) {}

  /**
   * Invokes respective service on user submit button click.
   * @param {ActionClickEventArgs} actionClickEventArgs
   */
  public onSubmitClick(actionClickEventArgs: ActionClickEventArgs): void {
    const resolver: ActionClickEventArgs = {
      resolve: () => {
        actionClickEventArgs.resolve();
        this.modalRef.hide();
      }
    };

    if (this.autoResolve) {
      this.modalRef.hide();
    }

    this.onSubmit.next(resolver);
    this.onSubmit.complete();
  }

  /**
   * hide the confirm popup window from the component.
   */
  public onCancelClick(): void {
    this.onCancel.next();
    this.onCancel.complete();
    this.modalRef.hide();
  }

  /**
   * ngOnDestroy event handler
   */
  public ngOnDestroy(): void {
    if (this.onSubmit) {
      this.onSubmit.complete();
    }

    if (this.onCancel) {
      this.onCancel.complete();
    }
  }
}
