import { NgModule } from '@angular/core';

import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { RecSlotRoutingModule } from './rec-slot-routing.module';
import { SharedRecModule } from '../../shared/shared-rec/shared-rec.module';
import { SharedRulesModule } from '../../shared/shared-rules/shared-rules.module';

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
    SharedCommonModule.forRoot(),
    DataTableModule.forRoot(),
    DropdownModule.forRoot(),
    SharedRecModule.forRoot(),
    SharedRulesModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class RecSlotModule {
}
