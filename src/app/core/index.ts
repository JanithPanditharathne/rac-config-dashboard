import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';

// components
import {
  AlertComponent,
  FooterComponent,
  InternalServerErrorComponent,
  LoadFailureComponent,
  MenuBarComponent,
  NotificationComponent,
  PageNotFoundComponent,
  UnauthorizedComponent
} from './components';

// Guards
import { AuthGuard } from './guards';
// services
import {
  AppHttpInterceptorService,
  AuthErrorHandlerService,
  ClientErrorInterceptorService,
  NotificationService,
  UserProfileService
} from './services';

/**
 * Export all core components.
 */
export const COMPONENTS = [
  FooterComponent,
  LoadFailureComponent,
  PageNotFoundComponent,
  InternalServerErrorComponent,
  NotificationComponent,
  UnauthorizedComponent,
  AlertComponent,
  MenuBarComponent
];

/**
 * Export all core services.
 */
export const SERVICES = [
  AuthGuard,
  AuthErrorHandlerService,
  {
    provide: ErrorHandler,
    useClass: ClientErrorInterceptorService
  },
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptorService
  },
  NotificationService,
  UserProfileService
];
