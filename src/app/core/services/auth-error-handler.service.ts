import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertType, HttpStatus } from '../enums';

import { NotificationService } from './notification.service';

import { CoreConstants } from '../core.constants';

@Injectable()
export class AuthErrorHandlerService {
  constructor(private readonly router: Router,
              private readonly notificationService: NotificationService
  ) {
  }

  public handleError(status: HttpStatus): void {
    if (status === HttpStatus.FORBIDDEN || status === HttpStatus.UNAUTHORIZED) {
      this.router.navigate(['/unauthorized']).catch(() => {
        this.notificationService.showNotification(CoreConstants.navigation_failure, AlertType.ERROR);
      });
    } else {
      this.router.navigate(['/load-failure']).catch(() => {
        this.notificationService.showNotification(CoreConstants.navigation_failure, AlertType.ERROR);
      });
    }
  }
}
