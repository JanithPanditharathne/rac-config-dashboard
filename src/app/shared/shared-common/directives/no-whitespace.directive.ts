import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { CustomFormValidator } from '../services';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
  selector: '[requiredField]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true}]
})
export class NoWhitespaceDirective implements Validator {

  private valFn = CustomFormValidator.noWhitespaceValidator();

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
