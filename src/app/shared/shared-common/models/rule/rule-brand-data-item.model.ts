import { DropDownDataItem } from '../common/drop-down-data-item.model';
import { RuleBaseDataItem } from './rule-base-data-item.model';

export interface RuleBrandDataItem extends RuleBaseDataItem {
  value: DropDownDataItem[];
}
