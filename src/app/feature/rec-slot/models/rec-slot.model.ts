import { DropDownDataItem } from '../../../shared/shared-common/models';
import { RecDropdownItemModel } from '../../../shared/shared-rec/models/rec-dropdown-item.model';

/**
 * Interface representing rec slot model.
 * @interface RecSlot.
 */
export interface RecSlot {
  id?: number;
  channel: DropDownDataItem;
  page: DropDownDataItem;
  placeholder: DropDownDataItem;
  rec: RecDropdownItemModel;
  rules: DropDownDataItem[];
}
