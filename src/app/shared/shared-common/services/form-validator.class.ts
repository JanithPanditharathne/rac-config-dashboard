import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

/**
 * Class representing form control based validation services.
 * @class FormValidator.
 */
export class FormValidator {
  /**
   * Trigger all form filed validation.
   * @param {FormGroup} formGroup Form group object.
   */
  public static validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });

        if (control.value instanceof Array) {
          control.markAsDirty();
        }
      } else if (control instanceof FormArray) {
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Mark as dirty for form control arrays.
   * @param {FormGroup} formGroup Form group object.
   */
  public static markFormArrayDirty(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.value instanceof Array) {
        control.markAsDirty();
      }
    });
  }

  public static isInvalidControl(abstractControl: AbstractControl): boolean {
    return (abstractControl.dirty || abstractControl.touched) && abstractControl.invalid;
  }

  public static clearControlValidators(abstractControl: AbstractControl): void {
    abstractControl.clearValidators();
    abstractControl.updateValueAndValidity();
  }

  public static setControlValidators(abstractControl: AbstractControl, validators: ValidatorFn | ValidatorFn[]): void {
    abstractControl.setValidators(validators);
    abstractControl.updateValueAndValidity();
  }

  public static isValidFormArray(controlsArray: AbstractControl): boolean {
    if (controlsArray instanceof FormArray && controlsArray.value instanceof Array) {
      return !!controlsArray.controls.find((formGroup: FormGroup) => {
        return formGroup.invalid;
      });
    }
    return false;
  }
}
