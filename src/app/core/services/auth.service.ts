import { Injectable } from '@angular/core';
import { CookieStorageService } from './cookie-storage.service';
import { CoreConstants } from '../core.constants';
import { UserProfile } from '../models';

@Injectable()
export class AuthService {

  private userProfile: UserProfile;

  constructor(
    private cookieStorageService: CookieStorageService
  ) {
    this.userProfile = {
      username: this.cookieStorageService.getCookie(CoreConstants.app_username),
    };
  }

  /**
   * Responsible for return value of userProfile.
   */
  public get currentUserProfile(): any {
    return this.userProfile;
  }

  /**
   * Responsible for making http POST call to user login.
   * @param userDetails
   */
  public authenticate(userDetails: any): void {
    this.userProfile = {
      username: userDetails.username,
      password: userDetails.password,
    };
    this.cookieStorageService.setCookieInMilliseconds(CoreConstants.app_username, this.userProfile.username, 900002.88);
  }

  /**
   * Responsible for logout the current user.
   */
  public logout() {
    this.cookieStorageService.deleteCookie(CoreConstants.app_username);
  }
}
