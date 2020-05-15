import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CookieStorageService } from '../services';

import { CoreConstants } from '../core.constants';

/**
 * Class representing login guard service.
 * LoginGuard.
 */
@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private cookieStorageService: CookieStorageService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const username = this.cookieStorageService.getCookie(CoreConstants.app_username);
    if (!!username) {
      return of(false).pipe(tap(() => {
        this.router.navigate(['/']);
      }));
    }
    return of(true);
  }
}
