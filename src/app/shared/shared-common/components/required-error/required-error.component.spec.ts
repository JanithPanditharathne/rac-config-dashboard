import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RequiredErrorComponent } from './required-error.component';

describe('Required error component tests', () => {
  let component: RequiredErrorComponent;
  let fixture: ComponentFixture<RequiredErrorComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredErrorComponent);
    component = fixture.componentInstance;
  }));

  it('should display required error when control is required and not valid', () => {
    const formControl = new FormControl('Test');
    formControl.setErrors({ required: true });
    formControl.markAsTouched();
    component.control = formControl;

    const requiredMessage = 'Test required error';
    component.requiredError = requiredMessage;

    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('.required'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toBe(requiredMessage);
  });
});
