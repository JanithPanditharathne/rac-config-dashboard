import { AlertType } from '../enums';

/**
 * Interface that represent an NotificationItem.
 * @interface NotificationItem.
 */
export interface NotificationItem {
  message: string;
  type: AlertType | string;
  count?: number;
}
