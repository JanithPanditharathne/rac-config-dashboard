import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AlertType } from '../../../../core/enums';

import { SharedCommonConstants } from '../../shared-common.constants';

import { ActionBarComponent } from './action-bar.component';

import { NotificationService } from '../../../../core/services';

describe('Action bar component tests', () => {
  let component: ActionBarComponent;
  let fixture: ComponentFixture<ActionBarComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let mockNotificatoinService;
  let notificationService: NotificationService;
  let mockRouter;
  let router: Router;

  const breadcrumbs = [
    {
      path: `test/path/1`,
      title: 'Test title 1'
    },
    {
      path: `test/path/2`,
      title: 'Test title 2'
    }
  ];

  beforeEach(async(() => {
    mockNotificatoinService = {
      showNotification: () => {}
    };

    mockRouter = {
      navigate: () => {
        return Promise;
      }
    };

    TestBed.configureTestingModule({
      declarations: [ActionBarComponent],
      providers: [{ provide: NotificationService, useValue: mockNotificatoinService }, { provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionBarComponent);
    component = fixture.componentInstance;

    notificationService = TestBed.get(NotificationService);
    router = TestBed.get(Router);

    spyOn(notificationService, 'showNotification');

    component.breadcrumb = breadcrumbs;
    fixture.detectChanges();
  }));

  it('should display correct number of breadcrumbs', () => {
    debugElement = fixture.debugElement.query(By.css('.breadcrumbs'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.children.length).toBe(2);
  });

  it('should display correct title for the breadcrumb', () => {
    debugElement = fixture.debugElement.query(By.css('.back-link-text'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(breadcrumbs[0].title);
  });

  it('should invoke #navigate of router when breadcrumb is clicked', () => {
    spyOn(router, 'navigate');
    debugElement = fixture.debugElement.query(By.css('.back-link'));
    debugElement.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([breadcrumbs[0].path]);
  });

  it('should invoke #showNotification of notification service when navigation failed', () => {
    const promise = Promise.reject('');
    spyOn(router, 'navigate').and.returnValue(promise);
    debugElement = fixture.debugElement.query(By.css('.back-link'));
    debugElement.triggerEventHandler('click', null);
    promise.catch(() => {
      expect(notificationService.showNotification).toHaveBeenCalledWith(SharedCommonConstants.navigation_failure, AlertType.ERROR);
    });
  });
});
