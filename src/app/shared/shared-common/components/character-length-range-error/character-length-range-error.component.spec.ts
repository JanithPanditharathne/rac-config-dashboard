import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CharacterLengthRangeErrorComponent } from './character-length-range-error.component';

describe('CharacterLengthRangeErrorComponent tests', () => {
  let component: CharacterLengthRangeErrorComponent;
  let fixture: ComponentFixture<CharacterLengthRangeErrorComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterLengthRangeErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterLengthRangeErrorComponent);

    component = fixture.componentInstance;
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('template tests', () => {
    const control = new FormControl('');
    const errorMessage = 'required error';
    const lengthMessage = 'length error';

    it('Should render two error messages when no inputs are provided and control is valid', () => {
      component.control = control;
      component.lengthError = lengthMessage;
      component.requiredError = errorMessage;

      fixture.detectChanges();

      debugElement = fixture.debugElement.query(By.all());
      const childrenLength = debugElement.nativeElement.children.length;
      const firstElement = debugElement.nativeElement.children[0];
      const secondElement = debugElement.nativeElement.children[1];

      expect(childrenLength).toBe(2);
      expect(firstElement.textContent).toContain(errorMessage);
      expect(secondElement.textContent).toContain(lengthMessage);
    });
  });
});
