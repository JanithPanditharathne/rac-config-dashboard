import { NgModule } from '@angular/core';

import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { RecSlotRoutingModule } from './rec-slot-routing.module';

/**
 * Module class for containing rec-slot module.
 * @class RecSlotModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [],
  imports: [
    RecSlotRoutingModule,
    SharedCommonModule,
    DataTableModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class RecSlotModule {
}
