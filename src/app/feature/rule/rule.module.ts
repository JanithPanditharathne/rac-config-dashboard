import { NgModule } from '@angular/core';

import { DataTableModule, DropdownModule } from 'ornamentum';

import { RuleRoutingModule } from './rule-routing.module';
import { SharedRulesModule } from '../../shared/shared-rules/shared-rules.module';
import { SharedCommonModule } from '../../shared/shared-common/shared-common.module';

import { COMPONENTS, ENTRY_COMPONENTS, SERVICES } from './index';

/**
 * Module class for containing rule module.
 * @class RuleModule
 */
@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [],
  imports: [
    RuleRoutingModule,
    SharedCommonModule,
    DataTableModule.forRoot(),
    DropdownModule.forRoot(),
    SharedRulesModule.forRoot()
  ],
  providers: [...SERVICES]
})
export class RuleModule {
}
