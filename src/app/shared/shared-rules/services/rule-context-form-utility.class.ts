import { FormBuilder, FormGroup } from '@angular/forms';

import { RuleTabDisplayDataType } from '../enums';
import { OperatorType } from '../../shared-common/enums';

/**
 * Rule based tab content form utility class.
 * @class RuleContextFormUtility.
 */
export class RuleContextFormUtility {

  public static operators = [
    {
      name: '=',
      type: OperatorType.EQUAL
    },
    {
      name: '<',
      type: OperatorType.LOWER_THAN
    },
    {
      name: '>',
      type: OperatorType.GREATER_THAN
    },
    {
      name: '>=',
      type: OperatorType.GREATER_THAN_OR_EQUAL
    },
    {
      name: '<=',
      type: OperatorType.LOWER_THAN_OR_EQUAL
    },
    {
      name: '#=',
      type: OperatorType.EQUAL_IGNORE_CASE
    }
  ];

  public static buildFormGroup(fb: FormBuilder, type: RuleTabDisplayDataType, data?: any): FormGroup {
    if (data) {
      return fb.group({
        condition: [data.condition],
        type: [type],
        value: [data.value]
      });
    }

    return fb.group({
      condition: 'AND',
      type: [type],
      value: [null]
    });
  }
}
