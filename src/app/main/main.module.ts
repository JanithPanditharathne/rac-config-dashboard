import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppCoreModule } from '../core/core.module';

import { BaseComponent } from './components';
import { COMPONENTS, ENTRY_COMPONENTS } from './index';

import { MainResolver } from './resolvers';
import { AngularSvgIconModule } from 'angular-svg-icon';

/**
 * Module class for containing main module.
 * @class AppMainModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [BaseComponent],
  imports: [AppCoreModule, RouterModule, CommonModule, ModalModule.forRoot(), AngularSvgIconModule.forRoot()],
  providers: [MainResolver]
})
export class AppMainModule {}
