import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertPopupComponent } from './alert-popup.component';

import { BsModalRef } from 'ngx-bootstrap/modal';

describe('Alert popup component tests', () => {
  let component: AlertPopupComponent;
  let fixture: ComponentFixture<AlertPopupComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let mockNModalRef;
  let modalRef: BsModalRef;

  beforeEach(async(() => {
    mockNModalRef = {
      hide: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [AlertPopupComponent],
      providers: [{ provide: BsModalRef, useValue: mockNModalRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPopupComponent);
    component = fixture.componentInstance;

    modalRef = TestBed.get(BsModalRef);
    spyOn(modalRef, 'hide');
  }));

  it('should display a correct message as an alert', () => {
    const testMessage = 'Test title 1';
    component.message = testMessage;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.modal-message'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(testMessage);
  });

  it('should invoke #hide of modalRef when close button is clicked', () => {
    debugElement = fixture.debugElement.query(By.css('.close-btn'));
    debugElement.triggerEventHandler('click', null);
    expect(modalRef.hide).toHaveBeenCalled();
  });

  it('should invoke #hide of modalRef when submit button is clicked', () => {
    debugElement = fixture.debugElement.query(By.css('.submit-btn'));
    debugElement.triggerEventHandler('click', null);
    expect(modalRef.hide).toHaveBeenCalled();
  });
});
