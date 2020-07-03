import { Component, Input } from '@angular/core';

import { RuleIfExpressionDataItem, RuleThenExpressionDataItem } from '../../models';

import { RuleContextDataService } from '../../../shared-rules/services';

/**
 * Component class to represent rule expressions.
 * @class ExpressionViewComponent
 */
@Component({
  selector: 'app-expression-view',
  styleUrls: ['./expression-view.component.scss'],
  templateUrl: './expression-view.component.html'
})
export class ExpressionViewComponent {
  public ruleData: RuleIfExpressionDataItem[] | RuleThenExpressionDataItem[];

  /**
   * Input to represent the rule expression data
   */
  @Input()
  public set expressionData(data: RuleIfExpressionDataItem[] | RuleThenExpressionDataItem[]) {
    this.ruleData = data || [];
  }

  /**
   * Input to represent section title of where the expression data is showed.
   */
  @Input()
  public sectionTitle: string;

  /**
   * Input to represent showing expression data title.
   */
  @Input()
  public showTitle: boolean;

  constructor(private readonly ruleContextDataService: RuleContextDataService) {
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
   * Returns true if the current context child's type item is matched to the Custom type.
   * @param {string} ruleDisplayType The rule display type.
   * @returns {boolean} True/False.
   */
  public isCustomType(ruleDisplayType: string): boolean {
    return this.ruleContextDataService.isCustomType(ruleDisplayType);
  }

}
