import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreConstants } from '../../core.constants';

import { UserProfile } from '../../models';

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
  public errorHeading = CoreConstants.unauthorizedErrorMessageHeading;
  public errorMessage = CoreConstants.unauthorizedErrorMessage;
  public redirectPath = CoreConstants.unauthorizedRedirectPath;
  public routeMessage = CoreConstants.unauthorizedRouteMessage;

  public profile: UserProfile;

  constructor(
    private readonly router: Router,
    private readonly userProfileService: UserProfileService
  ) {
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((user: UserProfile) => {
      this.profile = user;
    });
  }

  /**
   * Responsible for navigate to landing page.
   */
  public navigateToLandingPage(): void {
    this.router.navigate(['/']);
  }
}
