import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { RuleGeneratorType } from '../../../enums';

/**
 * Component class to represent application rule no data available view.
 * @class RuleNoDataAvailableViewComponent
 */
@Component({
  selector: 'app-rule-no-data-available-view',
  styleUrls: ['./rule-no-data-available-view.component.scss'],
  templateUrl: './rule-no-data-available-view.component.html'
})
export class RuleNoDataAvailableViewComponent {
  @Input()
  public contextType: RuleGeneratorType;

  @Input()
  public ruleType: AbstractControl;

  constructor() {
  }

  public getRuleTypeText(): string {
    return this.contextType === RuleGeneratorType.ACTION ? this.ruleType.value && this.ruleType.value.name.toLowerCase() : this.contextType;
  }
}
