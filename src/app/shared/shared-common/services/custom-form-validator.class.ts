import { AbstractControl, ValidatorFn } from '@angular/forms';

import { NumberRangeValidationArgs } from "../models";

export class CustomFormValidator {
  // regex patterns
  public static username_regex: RegExp = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d]))*$/i;
  public static password_regex: RegExp = /^(?:[0-9a-zA-Z!@#$%^&*])*$/;

  public static arrayMinLength(length: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return control.value.length < length ? {arrayMinLength: {value: control.value}} : null;
    };
  }

  public static arrayMaxLength(length: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return control.value.length > length ? {arrayMaxLength: {value: control.value}} : null;
    };
  }

  public static regexPattern(regex: RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      const regexp = regex.test(control.value);
      return !regexp ? {value: control.value} : null;
    };
  }

  public static arrayRange(range: NumberRangeValidationArgs): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return !(range.min <= control.value.length && control.value.length <= range.max) ? {arrayRange: {value: control.value}} : null;
    };
  }
}
