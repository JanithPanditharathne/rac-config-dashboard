import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidator } from '../../services';

@Component({
  selector: 'app-required-error',
  styleUrls: ['./required-error.component.scss'],
  templateUrl: './required-error.component.html'
})
export class RequiredErrorComponent {
  @Input()
  public control: AbstractControl;

  @Input()
  public requiredError: string;

  @Input()
  public errorType: string;

  public isInvalid(controlName: AbstractControl): boolean {
    return FormValidator.isInvalidControl(controlName);
  }
}
