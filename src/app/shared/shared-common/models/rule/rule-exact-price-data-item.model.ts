import { RuleBaseDataItem } from './rule-base-data-item.model';

import { OperatorType } from '../../enums';

export interface RuleExactPriceDataItem extends RuleBaseDataItem {
  value: {
    operator: OperatorType;
    price: number;
  };
}
