import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { OperatorType } from '../../enums';
import { RuleAdditionalDataViewType, RuleTabDisplayDataType } from '../../../shared-rules/enums';

/**
 * Component class to represent additional rule details.
 * @class AdditionalDetailViewComponent
 */
@Component({
  selector: 'app-additional-detail-view',
  styleUrls: ['./additional-detail-view.component.scss'],
  templateUrl: './additional-detail-view.component.html'
})
export class AdditionalDetailViewComponent {
  public AdditionalDataViewType = RuleAdditionalDataViewType;
  public RuleTabDisplayDataType = RuleTabDisplayDataType;

  /**
   * Input to represent the additional rule data in a grid row.
   */
  @Input()
  public data: any;

  /**
   * Input to represent the view type of the additional rule data.
   */
  @Input()
  public viewType: RuleAdditionalDataViewType;

  @ContentChild('actionTemplate', {static: false})
  public actionTemplate: TemplateRef<any>;

  constructor() {
  }

  /**
   * Responsible for return case tag based on operator.
   * @param {any} operator
   * @return {string} operator
   */
  public getOperatorValue(operator: any): string {
    if (typeof operator === 'boolean') {
      return operator ? 'ignore_case_values' : '';
    }
    return operator === OperatorType.EQUAL_IGNORE_CASE ? 'ignore_case_values' : '';
  }
}
