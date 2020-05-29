import { NgModule } from '@angular/core';

import { DataTableModule, DropdownModule } from 'ornamentum';

import { BundleRoutingModule } from './bundle-routing.module';
import { SharedBundleModule } from '../../shared/shared-bundle/shared-bundle.module';
import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';
import { SharedAlgorithmModule } from '../../shared/shared-algorithm/shared-algorithm.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';

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
    DropdownModule.forRoot(),
    SharedAlgorithmModule.forRoot(),
    SharedBundleModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class BundleModule {
}
