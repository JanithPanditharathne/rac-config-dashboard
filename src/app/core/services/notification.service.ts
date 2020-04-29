import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { NotificationItem } from '../models';

import { AlertType } from '../enums';

/**
 * Module class for notifications service.
 * @class NotificationService.
 */
@Injectable()
export class NotificationService {
  private notification = new Subject<NotificationItem>();

  /**
   * Show notification.
   * @param {string} message - notification message.
   * @param {AlertType} type - notification type.
   */
  public showNotification(message: string, type: AlertType): void {
    const notification: NotificationItem = {
      message: message,
      type: type
    };
    this.notification.next(notification);
  }

  /**
   * Return the notifications state.
   * @returns {Observable<NotificationItem>} - notification observable.
   */
  public getNotificationObservable(): Observable<NotificationItem> {
    return this.notification;
  }
}
