import { RuleBrandDataItem } from './rule-brand-data-item.model';
import { RuleProductNumberDataItem } from './rule-product-number-data-item.model';
import { RulePriceDataItem } from './rule-price-data-item.model';

export type RuleIfExpressionDataItem =
  | RulePriceDataItem
  | RuleBrandDataItem
  | RuleProductNumberDataItem;
