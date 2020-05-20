import { RuleBaseDataItem } from './rule-base-data-item.model';
import { OperatorType } from '../../enums/rules/operator-type.enum';

export interface RulePriceDataItem extends RuleBaseDataItem {
  value: {
    operator: OperatorType;
    price: number;
  }
}
