import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-popup',
  styleUrls: ['./alert-popup.component.scss'],
  templateUrl: './alert-popup.component.html'
})
export class AlertPopupComponent {
  public title: string;
  public message: string;

  constructor(public modalRef: BsModalRef) {}

  public onCloseClick(): void {
    this.modalRef.hide();
  }
}
