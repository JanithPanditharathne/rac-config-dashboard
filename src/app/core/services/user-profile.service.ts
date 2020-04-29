import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry, publishReplay, refCount } from 'rxjs/operators';

import { UserProfile } from '../models';

@Injectable()
export class UserProfileService {
  private static USER_PROFILE_GET = '/api/v1/profile';
  private static RETRY_COUNT = 2;

  private userProfile: Observable<UserProfile>;

  private showLogoutConfirm = false;

  constructor(private http: HttpClient) {}

  public getUserProfile(): Observable<UserProfile> {
    if (!this.userProfile) {
      this.userProfile = this.http.get<UserProfile>(UserProfileService.USER_PROFILE_GET).pipe(
        retry(UserProfileService.RETRY_COUNT),
        publishReplay(1),
        refCount()
      );
    }

    return this.userProfile;
  }

  public getLogoutPopupStatus(): boolean {
    return this.showLogoutConfirm;
  }

  public setLogoutPopupStatus(status): void {
    this.showLogoutConfirm = status;
  }
}
