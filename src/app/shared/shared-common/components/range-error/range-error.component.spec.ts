import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RangeErrorComponent } from './range-error.component';

describe('Range error component tests', () => {
  let component: RangeErrorComponent;
  let fixture: ComponentFixture<RangeErrorComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RangeErrorComponent);
    component = fixture.componentInstance;
  }));

  it('should display  required error when control is required and not valid', () => {
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

  it('should display min error when control is invalid due to min value', () => {
    const formControl = new FormControl('Test');
    formControl.setErrors({ min: true });
    formControl.markAsTouched();
    component.control = formControl;

    const minMessage = 'Test min error';
    component.minError = minMessage;

    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('.min'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toBe(minMessage);
  });

  it('should display max error when control is invalid due to max value', () => {
    const formControl = new FormControl('Test');
    formControl.setErrors({ max: true });
    formControl.markAsTouched();
    component.control = formControl;

    const maxMessage = 'Test max error';
    component.maxError = maxMessage;

    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('.max'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toBe(maxMessage);
  });
});
