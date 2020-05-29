import { NgModule } from '@angular/core';

import { DataTableModule, DropdownModule } from 'ornamentum';

import { AlgorithmRoutingModule } from './algorithm-routing.module';
import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';
import { SharedAlgorithmModule } from '../../shared/shared-algorithm/shared-algorithm.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';

/**
 * Module class for containing algorithm module.
 * @class AlgorithmModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [],
  imports: [
    AlgorithmRoutingModule,
    SharedCommonModule,
    DataTableModule.forRoot(),
    DropdownModule.forRoot(),
    SharedAlgorithmModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class AlgorithmModule {
}
