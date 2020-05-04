import { NgModule } from '@angular/core';

import { AlgorithmRoutingModule } from './algorithm-routing.module';
import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { SharedAlgorithmModule } from '../../shared/shared-algorithm/shared-algorithm.module';

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
