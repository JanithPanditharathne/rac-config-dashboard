import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserProfile } from '../../core/models';

import { AuthErrorHandlerService, UserProfileService } from '../../core/services';

@Injectable()
export class MainResolver implements Resolve<UserProfile> {
  constructor(private userProfileService: UserProfileService, private authErrorHandlerService: AuthErrorHandlerService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> {
    return this.userProfileService.getUserProfile().pipe(
      catchError((error: HttpErrorResponse) => {
        this.authErrorHandlerService.handleError(error.status);
        return of(null);
      })
    );
  }
}
