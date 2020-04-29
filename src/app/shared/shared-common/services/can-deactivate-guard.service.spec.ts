import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

import { CanComponentDeactivate } from '../models';

describe('CanDeactivateGuard tests', () => {
  const service = new CanDeactivateGuard();
  const nextState: RouterStateSnapshot = { url: 'unauthorized' } as RouterStateSnapshot;
  const component: CanComponentDeactivate = { canDeactivate: () => true } as CanComponentDeactivate;
  const currentRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const currentState: RouterStateSnapshot = {} as RouterStateSnapshot;

  describe('#canDeactivate tests', () => {
    it('Should return true when url is unauthorized', () => {
      const value = service.canDeactivate(component, currentRoute, currentState, nextState);
      expect(value).toBeTruthy();
    });

    it('Should return true when url is load-failure', () => {
      nextState.url = 'load-failure';
      const value = service.canDeactivate(component, currentRoute, currentState, nextState);
      expect(value).toBeTruthy();
    });

    it('Should return true when url is server-error', () => {
      nextState.url = 'server-error';
      const value = service.canDeactivate(component, currentRoute, currentState, nextState);
      expect(value).toBeTruthy();
    });

    it('Should return component.canDeactivate value when urls are non of unauthorized,load-failure,server-error', () => {
      nextState.url = 'channel-recs';
      const value = service.canDeactivate(component, currentRoute, currentState, nextState);
      expect(value).toBe(component.canDeactivate());
    });

    it('Should return true when urls are non of unauthorized,load-failure,server-error and component.canDeactivate is null', () => {
      nextState.url = 'channel-recs';
      component.canDeactivate = null;
      const value = service.canDeactivate(component, currentRoute, currentState, nextState);
      expect(value).toBeTruthy();
    });
  });
});
