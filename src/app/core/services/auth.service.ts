import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private userProfile: { username: string, password: string };

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
    }
  }
}
