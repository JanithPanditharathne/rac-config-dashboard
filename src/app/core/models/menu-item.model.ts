import { UserPermissionLevel } from '../enums';

export interface MenuItem {
  title: string;
  access: UserPermissionLevel[];
  listItemClasses?: string[];
  iconClasses?: string[];
  routePath: string;
  active?: boolean;
  expanded?: boolean;
  visible?: boolean;
  items?: MenuItem[];
}
