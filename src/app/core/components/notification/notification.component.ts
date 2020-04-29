import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { NotificationItem } from '../../models';

import { NotificationService } from '../../services';

/**
 * Component class to app alerts.
 * @implements OnDestroy
 * @class NotificationComponent
 */
@Component({
  selector: 'app-notification',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnDestroy {
  public notificationsList: NotificationItem[] = [];
  public timeOut = 5500;
  public showNotifications = false;

  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.getNotificationObservable().subscribe((notification: NotificationItem) => {
      this.validateNotification(notification);
    });
  }

  /**
   * ngOnDestroy event handler.
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Event handler for dismiss event of alert component.
   * @param notification - event payload.
   */
  public onDismiss(notification): void {
    if (this.notificationsList.indexOf(notification) >= 0) {
      this.notificationsList.splice(this.notificationsList.indexOf(notification), 1);
      this.showNotifications = this.isNotificationsListValid();
    }
  }

  /**
   * Method responsible for validating notifications list.
   * @returns {boolean} - returen true if notification list is not empty.
   */
  private isNotificationsListValid(): boolean {
    return this.notificationsList && this.notificationsList.length > 0;
  }

  /**
   * Validate the notification list items.
   * @param {NotificationItem} notification Notification item.
   */
  private validateNotification(notification: NotificationItem): void {
    const existingNotification = this.notificationsList.find((item: NotificationItem) => {
      return item.message === notification.message && item.type === notification.type;
    });

    if (existingNotification) {
      !existingNotification.count ? (existingNotification.count = 2) : existingNotification.count++;
      this.showNotifications = this.isNotificationsListValid();
      return;
    }

    this.notificationsList.unshift(notification);
    this.showNotifications = this.isNotificationsListValid();
  }
}
