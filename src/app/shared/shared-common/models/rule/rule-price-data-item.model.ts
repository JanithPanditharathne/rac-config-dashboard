import { RuleBaseDataItem } from './rule-base-data-item.model';

export interface RulePriceDataItem extends RuleBaseDataItem {
  value: {
    price: number;
  }
}
