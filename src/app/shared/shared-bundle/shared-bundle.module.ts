import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DropdownModule } from 'ornamentum';
import { DataTableModule } from 'ornamentum';

import { SharedCommonModule } from '../shared-common/shared-common.module';
import { SharedAlgorithmModule } from '../shared-algorithm/shared-algorithm.module';

import { COMPONENTS, DIRECTIVES, ENTRY_COMPONENTS, PIPES, SERVICES } from './index';

/**
 * Application shared bundle module (contains all shared bundle components, directives, pipes, models and services).
 * @class SharedBundleModule
 */
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    SharedCommonModule.forRoot(),
    SharedAlgorithmModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class SharedBundleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedBundleModule,
      providers: [...SERVICES, ...PIPES]
    };
  }
}
