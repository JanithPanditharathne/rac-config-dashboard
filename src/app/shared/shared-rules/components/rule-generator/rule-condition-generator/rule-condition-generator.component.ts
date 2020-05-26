import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Component class to represent application rule condition generator.
 * @class RuleConditionGeneratorComponent
 */
@Component({
  selector: 'app-rule-condition-generator',
  styleUrls: ['./rule-condition-generator.component.scss'],
  templateUrl: './rule-condition-generator.component.html'
})
export class RuleConditionGeneratorComponent {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public identifier: string;

  constructor() {
  }
}
