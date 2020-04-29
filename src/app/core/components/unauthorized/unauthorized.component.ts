import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreConstants } from '../../core.constants';

import { UserProfile } from '../../models';

import { UserPermissionLevel } from '../../enums';

import { UserProfileService } from '../../services';

/**
 * Component class to represent application unauthorized view.
 * @class UnauthorizedComponent
 */
@Component({
  selector: 'app-unauthorized',
  styleUrls: ['./unauthorized.component.scss'],
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit {
  public errorHeading = CoreConstants.unauthorized_error_message_heading;
  public errorMessage = CoreConstants.unauthorized_error_message;
  public redirectPath = CoreConstants.unauthorized_redirect_path;
  public routeMessage = CoreConstants.unauthorized_route_message;

  public profile: UserProfile;

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  public ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((user: UserProfile) => {
      this.profile = user;
    });
  }

  public navigateToLandingPage(): void {
    if (this.profile.userGroupId === UserPermissionLevel.CONFIGURATION) {
      this.router.navigateByUrl('/manage/sku-assortments');
    } else {
      this.router.navigate(['/']);
    }
  }
}
