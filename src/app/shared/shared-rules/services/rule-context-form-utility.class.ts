import { FormBuilder, FormGroup } from '@angular/forms';

import { RuleIfExpressionDataItem } from '../../shared-common/models';

import { RuleTabDisplayDataType } from '../enums';
import { OperatorType } from '../../shared-common/enums';

/**
 * Rule based tab content form utility class.
 * @class RuleContextFormUtility.
 */
export class RuleContextFormUtility {

  public static priceOperators = [
    {
      name: 'Equals (=)',
      type: OperatorType.EQUAL
    },
    {
      name: 'Less than (<)',
      type: OperatorType.LOWER_THAN
    },
    {
      name: 'Greater than (>)',
      type: OperatorType.GREATER_THAN
    },
    {
      name: 'Greater than or equals (>=)',
      type: OperatorType.GREATER_THAN_OR_EQUAL
    },
    {
      name: 'Less than or equals (<=)',
      type: OperatorType.LOWER_THAN_OR_EQUAL
    }
  ];

  public static numericalOperators = [
    {
      name: 'Equals (=)',
      type: OperatorType.EQUAL
    },
    {
      name: 'Less than (<)',
      type: OperatorType.LOWER_THAN
    },
    {
      name: 'Greater than (>)',
      type: OperatorType.GREATER_THAN
    },
    {
      name: 'Greater than or equals (>=)',
      type: OperatorType.GREATER_THAN_OR_EQUAL
    },
    {
      name: 'Less than or equals (<=)',
      type: OperatorType.LOWER_THAN_OR_EQUAL
    },
    {
      name: 'Equals ignore case (#=)',
      type: OperatorType.EQUAL_IGNORE_CASE
    }
  ];

  public static nonnumericalOperators = [
    {
      name: 'Equals (=)',
      type: OperatorType.EQUAL
    },
    {
      name: 'Equals ignore case (#=)',
      type: OperatorType.EQUAL_IGNORE_CASE
    }
  ];

  public static buildFormGroup(fb: FormBuilder, type: RuleTabDisplayDataType, data?: any): FormGroup {
    if (data) {
      switch (type) {
        case RuleTabDisplayDataType.Brand:
          return fb.group({
            condition: [data.condition],
            type: [type],
            operator: [this.mapToCheckboxValue(data.operator)],
            value: [data.value]
          });
        case RuleTabDisplayDataType.Price:
        case RuleTabDisplayDataType.ProductNumber:
        case RuleTabDisplayDataType.Custom:
          return fb.group({
            condition: [data.condition],
            type: [type],
            operator: [data.operator],
            value: [data.value]
          });
      }
    }
    return fb.group({
      condition: 'AND',
      type: [type],
      operator: [false],
      value: [null]
    });
  }

  public static mapToCheckboxValue(operator: OperatorType): boolean {
    return operator !== OperatorType.EQUAL;
  }

  public static setOperatorData(expressionData: RuleIfExpressionDataItem[]): RuleIfExpressionDataItem[] {
    return expressionData.map((data: RuleIfExpressionDataItem) => {
      if (data.type !== RuleTabDisplayDataType.Price && data.type !== RuleTabDisplayDataType.Custom) {
        data.operator = data.operator ? OperatorType.EQUAL_IGNORE_CASE : OperatorType.EQUAL;
      }
      return data;
    });
  }
}
