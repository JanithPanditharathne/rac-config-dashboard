import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidator } from '../../services';

@Component({
  selector: 'app-character-length-range-error',
  styleUrls: ['./character-length-range-error.component.scss'],
  templateUrl: './character-length-range-error.component.html'
})
export class CharacterLengthRangeErrorComponent {
  @Input()
  public control: AbstractControl;

  @Input()
  public lengthError: string;

  @Input()
  public requiredError: string;

  public isInvalid(controlName: AbstractControl): boolean {
    return this.control && FormValidator.isInvalidControl(controlName);
  }
}
