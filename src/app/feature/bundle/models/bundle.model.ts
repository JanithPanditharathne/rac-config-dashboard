import { Algorithm } from '../../algorithm/models';

/**
 * Interface representing bundle model.
 * @interface Bundle.
 */
export interface Bundle {
  id?: string;
  name?: string;
  displayName?: string;
  defaultLimit?: number;
  algorithms?: Algorithm[]
  combineEnabled?: boolean;
  combineDisplayText?: string;
}
