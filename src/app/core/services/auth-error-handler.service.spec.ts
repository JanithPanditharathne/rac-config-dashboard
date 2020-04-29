import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AlertType, HttpStatus } from '../enums';

import { AuthErrorHandlerService } from './auth-error-handler.service';
import { NotificationService } from './notification.service';

import { CoreConstants } from '../core.constants';

describe('Auth error handler service tests', () => {
  let router: Router;
  let notificationService: NotificationService;
  let authErrorHandlerService: AuthErrorHandlerService;

  beforeEach(() => {
    const promise = Promise.resolve('');
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(promise);

    const mockNotificationService = jasmine.createSpyObj('Router', ['showNotification']);

    TestBed.configureTestingModule({
      providers: [
        AuthErrorHandlerService,
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    authErrorHandlerService = TestBed.get(AuthErrorHandlerService);
    router = TestBed.get(Router);
    notificationService = TestBed.get(NotificationService);
  });

  describe('#handleError tests', () => {
    describe('Navigation success tests', () => {
      it('should invoke #navigate of router when http status 403 (forbidden)', () => {
        authErrorHandlerService.handleError(HttpStatus.FORBIDDEN);
        expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
      });

      it('should invoke #navigate of router when http status 401 (unauthorized)', () => {
        authErrorHandlerService.handleError(HttpStatus.UNAUTHORIZED);
        expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
      });

      it('should invoke #navigate of router when http status is other than 401 or 403', () => {
        authErrorHandlerService.handleError(HttpStatus.NOT_FOUND);
        expect(router.navigate).toHaveBeenCalledWith(['/load-failure']);
      });
    });

    describe('Navigation failure tests', () => {
      let promise: any;

      beforeEach(() => {
        promise = Promise.reject('');
        (router as any).navigate.and.returnValue(promise);
      });

      it('should invoke #showNotification of Notification Service when navigation failure', () => {
        authErrorHandlerService.handleError(HttpStatus.UNAUTHORIZED);

        promise.catch(() => {
          expect(notificationService.showNotification).toHaveBeenCalledWith(CoreConstants.navigation_failure, AlertType.ERROR);
        });
      });

      it('should invoke #showNotification of Notification Service when navigation failure', () => {
        authErrorHandlerService.handleError(HttpStatus.NO_INTERNET_CONNECTION);

        promise.catch(() => {
          expect(notificationService.showNotification).toHaveBeenCalledWith(CoreConstants.navigation_failure, AlertType.ERROR);
        });
      });
    });
  });
});
