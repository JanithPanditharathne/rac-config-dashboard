import { Bundle } from './bundle.model';

/**
 * Interface representing bundle save event arguments.
 * @interface BundleSaveEventArgs.
 */
export interface BundleSaveEventArgs {
  data?: Bundle;
  isSuccess: boolean;
}
