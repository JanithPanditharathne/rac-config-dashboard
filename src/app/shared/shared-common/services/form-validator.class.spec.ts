import { FormValidator } from './form-validator.class';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

describe('Form validator class test', () => {
  describe('#isDirtyInvalidControl tests', () => {
    it('should return true if control is touched and invalid', () => {
      const formControl = new FormControl('test');
      formControl.setErrors({ required: true });
      formControl.markAsTouched();
      expect(FormValidator.isInvalidControl(formControl)).toBeTruthy();
    });

    it('should return false if control is touched and valid', () => {
      const formControl = new FormControl('test');
      formControl.markAsTouched();
      expect(FormValidator.isInvalidControl(formControl)).toBeFalsy();
    });

    it('should return false if control is not touched and invalid', () => {
      const formControl = new FormControl('test');
      formControl.setErrors({ required: true });
      expect(FormValidator.isInvalidControl(formControl)).toBeFalsy();
    });
  });

  describe('#validateAllFormFields tests', () => {
    it('should mark all the form fields as touched', () => {
      const nameFormControl = new FormControl('name');
      const ageFormControl = new FormControl(23);
      const formGroup = new FormGroup({
        age: ageFormControl,
        name: nameFormControl
      });
      FormValidator.validateAllFormFields(formGroup);
      expect(ageFormControl.touched).toBeTruthy();
      expect(nameFormControl.touched).toBeTruthy();
    });

    it('should mark all the form fields as touched when form group contain multiple formGroups', () => {
      const nameFormControl = new FormControl('name');
      const ageFormControl = new FormControl(23);
      const formGroup = new FormGroup({
        age: ageFormControl,
        group: new FormGroup({
          name: nameFormControl
        })
      });
      FormValidator.validateAllFormFields(formGroup);
      expect(ageFormControl.touched).toBeTruthy();
      expect(nameFormControl.touched).toBeTruthy();
    });

    it('should mark controls as dirty if control value is an array', () => {
      const nameFormControl = new FormControl('name');
      const ageFormControl = new FormControl([10, 15, 20]);
      const formGroup = new FormGroup({
        age: ageFormControl,
        group: new FormGroup({
          name: nameFormControl
        })
      });
      FormValidator.validateAllFormFields(formGroup);
      expect(ageFormControl.dirty).toBeTruthy();
    });

    it('should mark controls as dirty if control is an formArray', () => {
      const firstName = new FormControl('fname');
      const lastName = new FormControl('lname');
      const ageFormControl = new FormArray([firstName, lastName]);
      const formGroup = new FormGroup({
        age: ageFormControl
      });
      FormValidator.validateAllFormFields(formGroup);
      expect(ageFormControl.dirty).toBeTruthy();
    });
  });

  describe('#markFormArrayDirty tests', () => {
    it('should mark all the form controls as dirty', () => {
      const formControl1 = new FormControl([1, 2, 3, 4, 5]);
      const formControl2 = new FormControl([10, 20, 30, 40, 50]);
      const formControl3 = new FormControl([100, 200, 300, 400, 500]);
      const formGroup = new FormGroup({
        1: formControl1,
        2: formControl2,
        3: formControl3
      });
      FormValidator.markFormArrayDirty(formGroup);
      expect(formControl1.dirty).toBeTruthy();
      expect(formControl2.dirty).toBeTruthy();
      expect(formControl3.dirty).toBeTruthy();
    });

    it('should not mark all the form controls as dirty', () => {
      const formControl1 = new FormControl([1, 2, 3, 4, 5]);
      const formControl2 = new FormGroup({
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formGroup = new FormGroup({
        1: formControl1,
        2: formControl2
      });
      FormValidator.markFormArrayDirty(formGroup);
      expect(formControl1.dirty).toBeTruthy();
      expect(formControl2.dirty).toBeFalsy();
    });
  });

  describe('#clearControlValidators tests', () => {
    it('should clear validators of the form control', () => {
      const formControl = new FormControl('value', Validators.required);
      FormValidator.clearControlValidators(formControl);
      expect(formControl.validator).toBe(null);
    });
  });

  describe('#setControlValidators tests', () => {
    it('should set validators of the form control', () => {
      const formControl = new FormControl('value');
      FormValidator.setControlValidators(formControl, Validators.required);
      expect(formControl.validator).not.toBe(null);
    });
  });

  describe('#isValidFormArray tests', () => {
    it('should return false even one control is invalid', () => {
      const formControl1 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5], Validators.required),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formControl2 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5]),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formArray = new FormArray([formControl1, formControl2]);
      formControl1.get('1').setErrors({ required: true });
      expect(FormValidator.isValidFormArray(formArray)).toBeTruthy();
    });

    it('should return true if all controls are valid', () => {
      const formControl1 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5], Validators.required),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formControl2 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5]),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formArray = new FormArray([formControl1, formControl2]);
      expect(FormValidator.isValidFormArray(formArray)).toBeFalsy();
    });

    it('should return false if form is not a controls array', () => {
      const formControl1 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5], Validators.required),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formControl2 = new FormGroup({
        1: new FormControl([1, 2, 3, 4, 5]),
        2: new FormControl([1, 2, 3, 4, 5])
      });
      const formGroup = new FormGroup({
        1: formControl1,
        2: formControl2
      });
      expect(FormValidator.isValidFormArray(formGroup)).toBeFalsy();
    });
  });
});
