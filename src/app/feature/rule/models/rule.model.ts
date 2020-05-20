import { RuleIfExpressionDataItem } from '../../../shared/shared-common/models';

export interface Rule {
  id: string;
  name: string;
  type: string;
  isGlobal: boolean;
  matchingConditionJson: RuleIfExpressionDataItem;
  actionConditionJson: RuleIfExpressionDataItem;
}
