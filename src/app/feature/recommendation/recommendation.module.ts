import { NgModule } from '@angular/core';

import { DataTableModule, DropdownModule } from 'ornamentum';

import { SharedRecModule } from '../../shared/shared-rec/shared-rec.module';
import { RecommendationRoutingModule } from './recommendation-routing.module';
import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';
import { SharedBundleModule } from '../../shared/shared-bundle/shared-bundle.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';

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
    DropdownModule.forRoot(),
    SharedBundleModule.forRoot(),
    SharedRecModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class RecommendationModule {
}
