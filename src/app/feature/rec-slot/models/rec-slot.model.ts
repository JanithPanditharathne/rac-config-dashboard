import { DropDownDataItem } from '../../../shared/shared-common/models';

/**
 * Interface representing rec slot model.
 * @interface RecSlot.
 */
export interface RecSlot {
  id?: number;
  channel: DropDownDataItem;
  page: DropDownDataItem;
  placeholder: DropDownDataItem;
  rec: DropDownDataItem;
  rules: DropDownDataItem[];
}
