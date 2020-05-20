import { DropDownDataItem } from '../../../shared/shared-common/models';

export interface RecSlot {
  id?: number;
  channel: DropDownDataItem;
  page: DropDownDataItem;
  placeholder: DropDownDataItem;
  rec: DropDownDataItem;
  rules: DropDownDataItem[];
}
