import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService, UserProfileService } from '../services';

/**
 * Class representing auth guard service.
 * AuthGuard.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(): Observable<boolean> {
    const profile = this.authService.currentUserProfile || null;

    if (!!profile && profile.username && profile.password) {
      return of(true);
    }

    return of(false).pipe(tap(() => {
      this.router.navigate(['login']);
    }));
  }
}
