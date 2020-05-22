import { Algorithm } from '../../algorithm/models/algorithm.model';

export interface Bundle {
  id?: string;
  name?: string;
  defaultLimit?: number;
  algorithms?: Algorithm[]
  combineEnabled?: boolean;
  combineDisplayText?: string;
}
