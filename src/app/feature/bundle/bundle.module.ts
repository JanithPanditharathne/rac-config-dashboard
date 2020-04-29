import { NgModule } from '@angular/core';

import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { BundleRoutingModule } from './bundle-routing.module';

/**
 * Module class for containing bundle module.
 * @class BundleModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [],
  imports: [
    BundleRoutingModule,
    SharedCommonModule,
    DataTableModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class BundleModule {
}
