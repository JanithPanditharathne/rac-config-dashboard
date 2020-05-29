import { RuleIfExpressionDataItem, RuleThenExpressionDataItem } from '../../../shared/shared-common/models';

/**
 * Interface representing rule.
 * @interface Rule.
 */
export interface Rule {
  id?: string;
  name: string;
  type: string;
  isGlobal: boolean;
  matchingConditionJson: RuleIfExpressionDataItem[];
  actionConditionJson: RuleThenExpressionDataItem[];
}
