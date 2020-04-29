import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NotificationItem } from '../../../models';

import { AlertType } from '../../../enums';

/**
 * Component class to app alerts.
 * @class AlertComponent
 */
@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.scss'],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  public notificationType: any;
  public show: boolean;

  /**
   * Input to represent notification data.
   */
  @Input()
  public notification: NotificationItem;

  /**
   * Input to represent timeout for the notification.
   */
  @Input()
  public timeOut: number;

  /**
   * Event for notification dismiss.
   * @type {EventEmitter<any>}
   */
  @Output()
  public dismiss: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.notificationType = AlertType;
    this.show = true;
  }

  /**
   * Event handler for close click.
   */
  public onCloseClick(): void {
    this.dismiss.emit(this.notification);
  }
}
