export interface MenuItem {
  title: string;
  access: any[];
  listItemClasses?: string[];
  iconClasses?: string[];
  routePath: string;
  active?: boolean;
  expanded?: boolean;
  visible?: boolean;
  items?: MenuItem[];
}
