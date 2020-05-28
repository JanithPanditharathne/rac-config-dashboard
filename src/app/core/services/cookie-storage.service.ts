import { Injectable } from '@angular/core';

/**
 * Class representing cookie-storage service.
 * CookieStorageService.
 */
@Injectable()
export class CookieStorageService {

  /**
   * Responsible for get cookie.
   * @param name
   */
  public getCookie(name: string): string {
    const cookieName = `${name}=`;
    const cookieList: string[] = document.cookie.split(';');

    for (let cookieVal of cookieList) {
      cookieVal = cookieVal.trimLeft();

      if (cookieVal.indexOf(cookieName) === 0) {
        return cookieVal.substring(cookieName.length, cookieVal.length);
      }
    }
    return '';
  }

  /**
   * Responsible for set cookie in days.
   * @param cookieName name for the cookie
   * @param cookieValue specific value field
   * @param expireDates duration of expiry (in dates)
   */
  public setCookieInDays(cookieName: string, cookieValue: string, expireDates: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (expireDates * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
  }

  /**
   * Responsible for set cookie in milliseconds.
   * @param cookieName name for the cookie
   * @param cookieValue specific value field
   * @param milliseconds duration of expiry (in milliseconds)
   */
  public setCookieInMilliseconds(cookieName: string, cookieValue: string, milliseconds: number): void {
    const date = new Date();
    date.setTime(date.getTime() + milliseconds);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
  }

  /**
   * Responsible for delete cookie.
   * @param cookieName name for the cookie
   */
  public deleteCookie(cookieName: string): void {
    this.setCookieInMilliseconds(cookieName, '', -1);
  }
}

