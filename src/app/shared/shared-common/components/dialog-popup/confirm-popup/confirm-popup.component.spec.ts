import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConfirmPopupComponent } from './confirm-popup.component';

import { BsModalRef } from 'ngx-bootstrap/modal';

describe('Confirm popup component tests', () => {
  let component: ConfirmPopupComponent;
  let fixture: ComponentFixture<ConfirmPopupComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let mockNModalRef;
  let modalRef: BsModalRef;

  beforeEach(async(() => {
    mockNModalRef = {
      hide: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [ConfirmPopupComponent],
      providers: [{ provide: BsModalRef, useValue: mockNModalRef }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPopupComponent);
    component = fixture.componentInstance;

    modalRef = TestBed.get(BsModalRef);
    spyOn(modalRef, 'hide');
  }));

  it('should display a correct title', () => {
    const testTitle = 'Test title';
    component.title = testTitle;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.modal-title'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(testTitle);
  });

  it('should display a correct message', () => {
    const testMessage = 'Test title';
    component.message = testMessage;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.modal-message'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(testMessage);
  });

  it('should invoke #hide of modalRef when close button is clicked', () => {
    debugElement = fixture.debugElement.query(By.css('.cancel-btn'));
    debugElement.triggerEventHandler('actionClick', null);
    expect(modalRef.hide).toHaveBeenCalled();
  });

  it('should invoke #hide of modalRef when submit button is clicked', () => {
    debugElement = fixture.debugElement.query(By.css('.submit-btn'));
    debugElement.triggerEventHandler('actionClick', null);
    expect(modalRef.hide).toHaveBeenCalled();
  });

  it('should not invoke #hide of modalRef when submit button is clicked', () => {
    component.autoResolve = false;
    debugElement = fixture.debugElement.query(By.css('.submit-btn'));
    debugElement.triggerEventHandler('actionClick', {
      resolve: () => {}
    });
    expect(modalRef.hide).not.toHaveBeenCalled();
  });
});
