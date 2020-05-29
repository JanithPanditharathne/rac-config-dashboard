import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap/alert';

import { UtilityModule } from 'ornamentum';

import { SharedCommonModule } from '../shared/shared-common/shared-common.module';

import { throwIfAlreadyLoaded } from './module-import.guard';

import { COMPONENTS, SERVICES } from './index';

/**
 * Module class for containing core module.
 * @class AppCoreModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule.forRoot(),
    SharedCommonModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token'
    }),
    BrowserAnimationsModule,
    AlertModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class AppCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppCoreModule');
  }
}
