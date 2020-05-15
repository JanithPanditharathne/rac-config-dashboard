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
  public async authenticate(userDetails: any): Promise<any> {
    this.userProfile = {
      username: userDetails.username,
      password: userDetails.password,
    };
    await this.cookieStorageService.setCookie(CoreConstants.app_username, this.userProfile.username, 0.0104167);
  }

  /**
   * Responsible for logout the current user.
   */
  public logout() {
    this.cookieStorageService.deleteCookie(CoreConstants.app_username);
  }
}
