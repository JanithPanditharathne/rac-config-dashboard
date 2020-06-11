import { OperatorType } from '../../enums';

export interface RuleBaseDataItem {
  type: string;
  condition: string;
  operator: OperatorType;
}
