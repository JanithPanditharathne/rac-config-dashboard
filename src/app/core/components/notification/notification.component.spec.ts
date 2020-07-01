import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Subject } from 'rxjs';

import { NotificationComponent } from './notification.component';

import { NotificationItem } from '../../models';

import { NotificationService } from '../../services';

import { AlertType } from '../../enums';

describe('Notification component tests', () => {
  describe('Notification subscription test', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let notificationService: NotificationService;
    let mockNotificationService;
    let alertElement: DebugElement;
    let notificationSubject;
    let testMessage;

    beforeEach(async(() => {
      testMessage = 'Test Message';
      notificationSubject = new Subject<NotificationItem>();
      mockNotificationService = {
        getNotificationObservable: () => {
          return notificationSubject;
        }
      };

      TestBed.configureTestingModule({
        declarations: [NotificationComponent],
        providers: [{ provide: NotificationService, useValue: mockNotificationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NotificationComponent);
      component = fixture.componentInstance;
      notificationService = TestBed.get(NotificationService);
    }));

    it('should have a empty notification list', () => {
      expect(component.notificationsList.length).toBe(0);
    });

    it('should have a notification', () => {
      notificationSubject.next({ message: testMessage, type: AlertType.SUCCESS });
      fixture.detectChanges();
      expect(component.notificationsList[0]).toEqual({ message: testMessage, type: AlertType.SUCCESS });
    });

    it('should have multiple notifications', () => {
      const testMessage1 = 'Test Message1';
      const testMessage4 = 'Test Message4';
      notificationSubject.next({ message: testMessage1, type: AlertType.SUCCESS });
      notificationSubject.next({ message: 'Test Message2', type: AlertType.ERROR });
      notificationSubject.next({ message: 'Test Message3', type: AlertType.INFO });
      notificationSubject.next({ message: testMessage4, type: AlertType.WARNING });
      fixture.detectChanges();
      expect(component.notificationsList.length).toEqual(4);
      expect(component.notificationsList[0]).toEqual({ message: testMessage4, type: AlertType.WARNING });
      expect(component.notificationsList[3]).toEqual({ message: testMessage1, type: AlertType.SUCCESS });
    });

    it('should remove notification from notification list', () => {
      const notificationToBeRemoved = { message: testMessage, type: AlertType.SUCCESS };
      notificationSubject.next(notificationToBeRemoved);
      fixture.detectChanges();
      alertElement = fixture.debugElement.query(By.css('.app-alert'));
      alertElement.triggerEventHandler('dismiss', notificationToBeRemoved);
      expect(component.notificationsList.length).toEqual(0);
    });

    it('should not remove notification from notification list', () => {
      const notificationToBeRemoved = { message: 'Test Message for removing', type: AlertType.SUCCESS };
      notificationSubject.next({ message: testMessage, type: AlertType.WARNING });
      fixture.detectChanges();
      alertElement = fixture.debugElement.query(By.css('.app-alert'));
      alertElement.triggerEventHandler('dismiss', notificationToBeRemoved);
      expect(component.notificationsList.length).toEqual(1);
    });

    it('should increment the count of the notification when the same notification is rendered', () => {
      const mockMessage = 'Same Message';
      notificationSubject.next({ message: mockMessage, type: AlertType.SUCCESS });
      notificationSubject.next({ message: mockMessage, type: AlertType.SUCCESS });
      notificationSubject.next({ message: mockMessage, type: AlertType.SUCCESS });
      fixture.detectChanges();
      expect(component.notificationsList[0].count).toBe(3);
    });
  });
});
