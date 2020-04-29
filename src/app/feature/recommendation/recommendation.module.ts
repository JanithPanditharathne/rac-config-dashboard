import { NgModule } from '@angular/core';

import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';
import { DataTableModule, DropdownModule } from 'ornamentum';
import { RecommendationRoutingModule } from './recommendation-routing.module';

/**
 * Module class for containing recommendation module.
 * @class RecommendationModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [],
  imports: [
    RecommendationRoutingModule,
    SharedCommonModule,
    DataTableModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class RecommendationModule {
}
