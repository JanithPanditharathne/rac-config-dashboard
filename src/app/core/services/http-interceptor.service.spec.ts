import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GlobalRefService } from 'ornamentum';

import { AlertType, HttpStatus } from '../enums';

import { AppHttpInterceptorService } from './http-interceptor.service';
import { NotificationService } from './notification.service';
import { AuthErrorHandlerService } from './auth-error-handler.service';

class MockNotificationService {
  showNotification(message: string, type: AlertType) {
  }
}

class MockAuthErrorHandlerService {
  handleError(status: HttpStatus): void {
  }
}

const MockGlobalRefService = {
  window: {
    location: {
      reload: () => {
      }
    }
  }
};

describe(`AppHttpInterceptorService tests`, () => {
  let httpMock: HttpTestingController;
  let notificationService: NotificationService;
  let authErrorHandlerService: AuthErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          multi: true,
          provide: HTTP_INTERCEPTORS,
          useClass: AppHttpInterceptorService
        },
        {provide: NotificationService, useClass: MockNotificationService},
        {provide: AuthErrorHandlerService, useClass: MockAuthErrorHandlerService},
        {provide: GlobalRefService, useValue: MockGlobalRefService}
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    authErrorHandlerService = TestBed.get(AuthErrorHandlerService);

    spyOn(notificationService, 'showNotification');
    spyOn(authErrorHandlerService, 'handleError');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
