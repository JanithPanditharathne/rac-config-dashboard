import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidator } from '../../services';

@Component({
  selector: 'app-range-error',
  styleUrls: ['./range-error.component.scss'],
  templateUrl: './range-error.component.html'
})
export class RangeErrorComponent {
  @Input()
  public control: AbstractControl;

  @Input()
  public minError: string;

  @Input()
  public maxError: string;

  @Input()
  public requiredError: string;

  public isInvalid(controlName: AbstractControl): boolean {
    return FormValidator.isInvalidControl(controlName);
  }
}
