import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppCoreModule } from '../core/core.module';

import { BaseComponent } from './components';
import { COMPONENTS, ENTRY_COMPONENTS } from './index';

/**
 * Module class for containing main module.
 * @class AppMainModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [BaseComponent],
  imports: [AppCoreModule, RouterModule, CommonModule, ModalModule.forRoot()],
  providers: []
})
export class AppMainModule {}
