import { RuleBaseDataItem } from './rule-base-data-item.model';

export interface RuleCustomDataItem extends RuleBaseDataItem {
  value: {
    key: string,
    values: string[]
  };
}
