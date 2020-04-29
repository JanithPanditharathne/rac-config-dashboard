import { async, inject, TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

import { AlertType } from '../enums';

import { NotificationItem } from '../models';

describe('Notification service tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NotificationService] });
  });

  it('#getNotificationObservable should return a notification', async(
    inject([NotificationService], (service: NotificationService) => {
      const notification: NotificationItem = { type: AlertType.SUCCESS, message: 'Test message' };
      service.showNotification(notification.message, AlertType.SUCCESS);
      service.getNotificationObservable().subscribe(value => {
        expect(value).toEqual(notification);
      });
    })
  ));
});
