import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidator } from '../../services';

@Component({
  selector: 'app-common-control-error-view',
  styleUrls: ['./common-control-error-view.component.scss'],
  templateUrl: './common-control-error-view.component.html'
})
export class CommonControlErrorViewComponent {
  @Input()
  public control: AbstractControl;

  @Input()
  public requiredError: string;

  @Input()
  public minValueError: string;

  @Input()
  public maxValueError: string;

  @Input()
  public lengthError: string;

  @Input()
  public whitespaceError: string;

  public isInvalid(controlName: AbstractControl): boolean {
    return FormValidator.isInvalidControl(controlName);
  }
}
