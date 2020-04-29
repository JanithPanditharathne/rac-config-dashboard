import { Observable } from 'rxjs';

/**
 * Interface representing CanComponentDeactivate.
 * @Interface CanComponentDeactivate
 */
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
