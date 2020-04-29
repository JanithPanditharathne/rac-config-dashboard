import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalRefService } from 'ornamentum';

import { AlertType, HttpStatus } from '../enums';

import { AppHttpInterceptorService } from './http-interceptor.service';
import { NotificationService } from './notification.service';
import { AuthErrorHandlerService } from './auth-error-handler.service';

class MockNotificationService {
  showNotification(message: string, type: AlertType) {}
}

class MockAuthErrorHandlerService {
  handleError(status: HttpStatus): void {}
}

const MockGlobalRefService = {
  window: {
    location: {
      reload: () => {}
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
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: AuthErrorHandlerService, useClass: MockAuthErrorHandlerService },
        { provide: GlobalRefService, useValue: MockGlobalRefService }
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

  it('should not invoke #showNotification of notification service', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http.get(url).subscribe(() => {});

    const req = httpMock.expectOne(url);

    req.flush({ message: 'Successful' }, { status: 200, statusText: '' });
    httpMock.verify();

    expect(notificationService.showNotification).not.toHaveBeenCalled();
  }));

  it('should invoke #showNotification of notification service with message NO INTERNET CONNECTION', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http
      .get(url)
      .pipe(
        catchError(actualError => {
          return of(actualError);
        })
      )
      .subscribe();

    const req = httpMock.expectOne(url);

    req.flush({}, { status: 0, statusText: '' });

    expect(notificationService.showNotification).toHaveBeenCalledWith('NO INTERNET CONNECTION', AlertType.ERROR);
    httpMock.verify();
  }));

  it('should invoke #showNotification of notification service with message REQUEST FAILURE', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http
      .get(url)
      .pipe(
        catchError(actualError => {
          return of(actualError);
        })
      )
      .subscribe();

    const req = httpMock.expectOne(url);

    req.flush({}, { status: 404, statusText: '' });

    expect(notificationService.showNotification).toHaveBeenCalledWith('REQUEST FAILURE', AlertType.ERROR);
    httpMock.verify();
  }));

  it('should invoke #showNotification with the message INTERNAL SERVER ERROR when response status is not 0 or 404', inject(
    [HttpClient],
    (http: HttpClient) => {
      const url = '/testEndPoint/url';
      http
        .get(url)
        .pipe(
          catchError(actualError => {
            return of(actualError);
          })
        )
        .subscribe();

      const req = httpMock.expectOne(url);

      req.flush({}, { status: 400, statusText: '' });

      expect(notificationService.showNotification).toHaveBeenCalledWith('INTERNAL SERVER ERROR', AlertType.ERROR);
      httpMock.verify();
    }
  ));

  it('should invoke #showNotification of notification service with server error message', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http
      .get(url)
      .pipe(
        catchError(actualError => {
          return of(actualError);
        })
      )
      .subscribe();

    const req = httpMock.expectOne(url);

    req.flush(
      {
        error: {
          code: '5523A',
          message: 'Could not delete this item'
        }
      },
      { status: 408, statusText: '' }
    );

    expect(notificationService.showNotification).toHaveBeenCalledWith('5523A : Could not delete this item', AlertType.ERROR);
    httpMock.verify();
  }));

  it('should invoke #handleError of authErrorHandlerService when response code is KIRA-4010', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http
      .get(url)
      .pipe(
        catchError(actualError => {
          return of(actualError);
        })
      )
      .subscribe();

    const req = httpMock.expectOne(url);

    req.flush(
      {
        error: {
          code: 'KIRA-4010',
          message: 'Unauthorized'
        }
      },
      { status: 408, statusText: '' }
    );

    expect(authErrorHandlerService.handleError).not.toHaveBeenCalled();
    httpMock.verify();
  }));

  it('should invoke #handleError of authErrorHandlerService when response code is KIRA-4030', inject([HttpClient], (http: HttpClient) => {
    const url = '/testEndPoint/url';
    http
      .get(url)
      .pipe(
        catchError(actualError => {
          return of(actualError);
        })
      )
      .subscribe();

    const req = httpMock.expectOne(url);

    req.flush(
      {
        error: {
          code: 'KIRA-4030',
          message: 'Forbidden'
        }
      },
      { status: 408, statusText: '' }
    );

    expect(authErrorHandlerService.handleError).toHaveBeenCalled();
    httpMock.verify();
  }));
});
