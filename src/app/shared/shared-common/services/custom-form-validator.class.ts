import { AbstractControl, ValidatorFn } from '@angular/forms';

import { NumberRangeValidationArgs } from '../models';

export class CustomFormValidator {
  // regex patterns
  public static username_regex: RegExp = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d]))*$/i;
  public static integer_regex: RegExp = /^\d*$/;
  public static password_regex: RegExp = /^(?:[0-9a-zA-Z!@#$%^&*])*$/;
  public static alphanumeric_regex: RegExp = /^[a-zA-Z0-9]+$/;
  public static integer_with_two_decimal_regex: RegExp = /^\d*(\.\d{0,2})?$/;

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

  public static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let isWhitespace = (control.value || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid ? null : {'whitespace': 'value is only whitespace'};
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
