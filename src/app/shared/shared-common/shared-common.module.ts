import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { COMPONENTS, DIRECTIVES, ENTRY_COMPONENTS, PIPES, SERVICES } from './index';

/**
 * Application shared common module (contains all shared common components, directives, pipes, models and services).
 * @class SharedCommonModule
 */
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [BsDatepickerModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule, PopoverModule.forRoot()]
})
export class SharedCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedCommonModule,
      providers: [...SERVICES, ...PIPES]
    };
  }
}
