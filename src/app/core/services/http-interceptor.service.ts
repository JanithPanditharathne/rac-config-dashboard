import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalRefService } from 'ornamentum';

import { KeycloakService } from 'keycloak-angular';

import { ErrorResponse } from '../models';

import { AlertType, HttpStatus } from '../enums';

import { AuthErrorHandlerService } from './auth-error-handler.service';
import { NotificationService } from './notification.service';

import { CoreConstants } from '../core.constants';

/**
 * Module class for application http interceptor.
 * @implements HttpInterceptor
 * @class AppHttpInterceptorService.
 */
@Injectable()
export class AppHttpInterceptorService implements HttpInterceptor {
  constructor(
    private readonly keycloakAngular: KeycloakService,
    private readonly globalRefService: GlobalRefService,
    private readonly notificationService: NotificationService,
    private readonly authErrorHandlerService: AuthErrorHandlerService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const user = this.keycloakAngular.getUsername();
      req = req.clone({
        setHeaders: {
          'User-ID': user
        }
      });
    } catch (e) {
      console.log('Failed to load user details', e);
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.onError(err);
        }
        return throwError(err);
      })
    );
  }

  /**
   * Handle http errors.
   * @param response - ErrorResponse.
   */
  private onError(response: HttpErrorResponse): void {
    const type: AlertType = AlertType.ERROR;

    const clientErrorMessage = this.handleClientSideError(response.status);
    if (clientErrorMessage) {
      this.notificationService.showNotification(clientErrorMessage, type);
      return;
    }

    const serverErrorMessage = this.handleServerError(response.error);
    if (serverErrorMessage) {
      this.notificationService.showNotification(serverErrorMessage, type);
    }
  }

  /**
   * Handle client side errors using error status.
   * @param {number} status - status code.
   * @returns {boolean} -  returns true if a client error is detected.
   */
  private handleClientSideError(status: number): string {
    switch (status) {
      case HttpStatus.NO_INTERNET_CONNECTION:
        return CoreConstants.noInternetConnectionErrorNotificationMessage;
      case HttpStatus.NOT_FOUND:
        return CoreConstants.requestFailureErrorNotificationMessage;
      default:
        return null;
    }
  }

  private handleServerError(errorResponse: ErrorResponse): string {
    let message: string;
    if (errorResponse && errorResponse.code) {
      const code = errorResponse.code;
      if (code === CoreConstants.kiraUnauthorizedStatusCode) {
        this.globalRefService.window.location.reload();
        return null;
      }

      if (code === CoreConstants.kiraForbiddenStatusCode) {
        this.authErrorHandlerService.handleError(HttpStatus.FORBIDDEN);
        return null;
      }

      message = `${errorResponse.code} : ${errorResponse.message}`;
    } else {
      message = CoreConstants.internalServerErrorNotificationMessage;
    }

    return message;
  }
}
