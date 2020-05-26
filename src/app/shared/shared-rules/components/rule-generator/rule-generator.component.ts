import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RuleGeneratorType } from '../../enums';

import { RuleContextDataService } from '../../services';

/**
 * Component class to represent application rule generator.
 * @class RuleGeneratorComponent
 */
@Component({
  selector: 'app-rule-generator',
  styleUrls: ['./rule-generator.component.scss'],
  templateUrl: './rule-generator.component.html'
})
export class RuleGeneratorComponent {
  public RuleGeneratorType = RuleGeneratorType;

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public contextType: RuleGeneratorType;

  constructor(private ruleContextDataService: RuleContextDataService) {
  }

  /**
   * Returns true if the current context child's type item is matched to the Price type.
   * @param {string} ruleDisplayType The rule display type.
   * @returns {boolean} True/False.
   */
  public isPriceType(ruleDisplayType: string): boolean {
    return this.ruleContextDataService.isPriceType(ruleDisplayType);
  }

  /**
   * Format and returns the id of rule condition generator
   * @param index Rule condition index
   */
  public formatRuleConditionId(index): string {
    return `${this.contextType}-${index}`;
  }
}
