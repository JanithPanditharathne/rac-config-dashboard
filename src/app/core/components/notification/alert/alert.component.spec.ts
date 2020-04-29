import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertType } from '../../../enums';
import { NotificationItem } from '../../../models';
import { AlertComponent } from './alert.component';

describe('Alert component tests', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  const notification: NotificationItem = { type: AlertType.SUCCESS, message: 'Test notification Message' };
  const timeOut = 5000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  }));

  it('should display original notification text', () => {
    component.notification = notification;
    component.timeOut = timeOut;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.alert-type'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(component.notification.message);
  });

  it('should emit close dismiss event', () => {
    const renderedNotification: NotificationItem = { type: AlertType.ERROR, message: 'Test notification Message' };
    let expectedNotification: NotificationItem;
    component.notification = renderedNotification;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.alert-type'));

    component.dismiss.subscribe((item: NotificationItem) => {
      expectedNotification = item;
    });
    debugElement.triggerEventHandler('onClosed', notification);
    expect(expectedNotification).toBe(renderedNotification);
  });
});
