import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { GlobalRefService } from 'ornamentum';

/**
 * Application unexpected client error handler.
 * @implements ErrorHandler
 * Centralized error handler hook.
 */
@Injectable()
export class ClientErrorInterceptorService implements ErrorHandler {
  private static client_error_holder_identifier = 'client-error-message-holder';
  private static client_error_reload_button_identifier = 'btn-client-error-reload';
  private static client_error_code = 'client-error-codes';
  private static client_error_post_endpoint = '/api/v1/log/client/error';

  private lastError: Error;

  constructor(private globalRef: GlobalRefService, private http: HttpClient) {
    const reloadBtn = <HTMLAnchorElement>(
      this.globalRef.window.document.getElementById(ClientErrorInterceptorService.client_error_reload_button_identifier)
    );
    reloadBtn.addEventListener('click', () => {
      this.globalRef.window.location.reload(true);
    });
  }

  /**
   * Verify if current error is the same last error.
   * @param {Error} error Error object.
   * @return {boolean} True if current error is teh same as previous error.
   */
  private isSameError(error: Error) {
    return this.lastError.name === error.name && this.lastError.message === error.message && this.lastError.stack === error.stack;
  }

  /**
   * Handle client side error.
   * Show error message and log to console when unexpected client error occurred.
   * @param error Error object.
   */
  public handleError(error): void {
    try {
      if (error instanceof Error) {
        if (!this.lastError || !this.isSameError(error)) {
          this.lastError = error;
          const clientErrorDiv = this.globalRef.window.document.getElementById(ClientErrorInterceptorService.client_error_holder_identifier);
          const clientErrorSpan = this.globalRef.window.document.getElementById(ClientErrorInterceptorService.client_error_code);
          if (clientErrorDiv && clientErrorSpan) {
            clientErrorDiv.style.display = 'block';
            const errorData = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              url: this.globalRef.window.location.href
            };

            this.http
              .post(ClientErrorInterceptorService.client_error_post_endpoint, errorData, { responseType: 'text' })
              .subscribe((errorCode: string) => {
                if (!clientErrorSpan.innerText) {
                  clientErrorSpan.innerText = `Error code: ${errorCode}`;
                }
              });
          }
        }
      }
    } catch (error) {
      this.globalRef.window.console.log('Client error log failure: ', error);
    }

    this.globalRef.window.console.error(error);
  }
}
