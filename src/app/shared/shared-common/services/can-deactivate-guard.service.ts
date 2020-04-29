import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { CanComponentDeactivate } from '../models';

/**
 * Class implements CanDeactivate<CanComponentDeactivate>.
 * @class CanDeactivateGuard.
 */
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  public canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {
    if (nextState.url === 'unauthorized' || nextState.url === 'load-failure' || nextState.url === 'server-error') {
      return true;
    }

    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
