import { Injectable } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Observable, Subject } from 'rxjs';

import { ActionType } from '../enums';

import { ConfirmPopupComponent } from '../components';

import { SharedCommonConstants } from '../shared-common.constants';

/**
 * Shared module class for routeDiscardConfirm dialog service.
 * @class ConfirmDialogService.
 */
@Injectable()
export class ConfirmDialogService {
  constructor(private readonly modalService: BsModalService) {
  }

  public routeDiscardConfirm(message?: string): Observable<boolean> {
    const routeChangeStream = new Subject<boolean>();
    const modalRef = this.modalService.show(ConfirmPopupComponent, {
      class: 'route-discard-confirm-popup confirmation-popup',
      ignoreBackdropClick: true
    });
    modalRef.content.title = SharedCommonConstants.dialogTitle;
    modalRef.content.message = message || SharedCommonConstants.dialogMessage;
    modalRef.content.actionType = ActionType.OK;
    modalRef.content.actionName = SharedCommonConstants.dialogAction;
    modalRef.content.onSubmit.subscribe(() => {
      routeChangeStream.next(true);
      routeChangeStream.complete();
    });

    modalRef.content.onCancel.subscribe(() => {
      routeChangeStream.next(false);
      routeChangeStream.complete();
    });

    return routeChangeStream;
  }
}
