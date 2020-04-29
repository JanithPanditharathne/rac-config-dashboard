import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";

import { UserProfile } from "../models";

import { AlertType, UserPermissionLevel } from "../enums";

import { NotificationService } from "./notification.service";

import { CoreConstants } from "../core.constants";

/**
 * Class representing role base default route service
 * @class RoleBaseDefaultRouteService
 */
@Injectable()
export class RoleBaseDefaultRouteService {
  constructor(private router: Router,
              private notificationService: NotificationService,) {
  }

  /**
   * Responsible to handle default route based on user role.
   */
  public defaultRouteHandler(user: UserProfile, state: RouterStateSnapshot): void {
    if (user.userGroupId === UserPermissionLevel.CONFIGURATION && state.url == '/') {
      this.router.navigate(['/manage/sku-assortments']).catch(() => {
        this.notificationService.showNotification(CoreConstants.navigation_failure, AlertType.ERROR);
      });
    }
  }
}
