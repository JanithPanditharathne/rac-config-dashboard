import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { CoreConstants } from '../core.constants';

/**
 * Class representing auth guard service.
 * AuthGuard.
 */
@Injectable()
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {

  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  public isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login({redirectUri: document.baseURI})
          .catch(e => console.error(e));
        return reject(false);
      }

      const requiredRoles: string[] = route.data.roles;

      if (!this.keycloakAngular.isUserInRole('cp_access')) {
        alert(CoreConstants.accessDeniedMessage);
        this.keycloakAngular.logout();
        resolve(false);
      }
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        return resolve(requiredRoles.every(role => this.roles.indexOf(role) > -1));
      }
    });
  }
}
