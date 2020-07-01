import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

    spyOn(notificationService, 'showNotification');

    component.breadcrumb = breadcrumbs;
    fixture.detectChanges();
  }));

  it('should display correct number of breadcrumbs', () => {
    debugElement = fixture.debugElement.query(By.css('.breadcrumbs'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.children.length).toBe(2);
  });
});
