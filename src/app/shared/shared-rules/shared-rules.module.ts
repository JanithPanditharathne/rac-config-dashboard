import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { DropdownModule } from 'ornamentum';

import { SharedCommonModule } from '../shared-common/shared-common.module';

import { COMPONENTS, DIRECTIVES, ENTRY_COMPONENTS, PIPES, SERVICES } from './index';

/**
 * Application shared rules module (contains all shared common components, directives, pipes, models and services).
 * @class SharedRulesModule
 */
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [BsDatepickerModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule, PopoverModule.forRoot(), SharedCommonModule.forRoot(), DropdownModule]
})
export class SharedRulesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedRulesModule,
      providers: [...SERVICES, ...PIPES]
    };
  }
}
