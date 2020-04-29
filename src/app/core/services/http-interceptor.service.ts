import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalRefService } from 'ornamentum';

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
    private notificationService: NotificationService,
    private authErrorHandlerService: AuthErrorHandlerService,
    private globalRefService: GlobalRefService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
        return CoreConstants.no_internet_connection_error_notification_message;
      case HttpStatus.NOT_FOUND:
        return CoreConstants.request_failure_error_notification_message;
      default:
        return;
    }
  }

  private handleServerError(errorResponse: ErrorResponse): string {
    let message: string;
    if (errorResponse && errorResponse.error && errorResponse.error.code) {
      const code = errorResponse.error.code;
      if (code === CoreConstants.kira_unauthorized_status_code) {
        this.globalRefService.window.location.reload();
        // this.authErrorHandlerService.handleError(HttpStatus.UNAUTHORIZED);
        return;
      }

      if (code === CoreConstants.kira_forbidden_status_code) {
        this.authErrorHandlerService.handleError(HttpStatus.FORBIDDEN);
        return;
      }

      message = `${errorResponse.error.code} : ${errorResponse.error.message}`;
    } else {
      message = CoreConstants.internal_server_error_notification_message;
    }

    return message;
  }
}
