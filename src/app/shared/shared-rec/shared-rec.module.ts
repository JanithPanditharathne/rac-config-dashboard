import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { SERVICES } from './index';

/**
 * Application shared rec module (contains all shared common components, directives, pipes, models and services).
 * @class SharedCommonModule
 */
@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  imports: [BsDatepickerModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule, PopoverModule.forRoot()]
})
export class SharedRecModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedRecModule,
      providers: [...SERVICES]
    };
  }
}
