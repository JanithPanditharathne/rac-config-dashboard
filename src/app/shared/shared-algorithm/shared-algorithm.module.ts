import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { COMPONENTS, DIRECTIVES, ENTRY_COMPONENTS, PIPES, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { ModalModule } from 'ngx-bootstrap/modal';

/**
 * Application shared algorithm module (contains all shared algorithm components, directives, pipes, models and services).
 * @class SharedAlgorithmModule
 */
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedCommonModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule.forRoot(),
    DropdownModule.forRoot(),
  ]
})
export class SharedAlgorithmModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedAlgorithmModule,
      providers: [...SERVICES, ...PIPES]
    };
  }
}
