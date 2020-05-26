/**
 * Export all shared entry components.
 */
import { RuleContextDataService, RuleContextFormUtility, RuleService, RuleUtilityService } from './services';

import {
  RuleConditionGeneratorComponent,
  RuleContextComponent,
  RuleGeneratorComponent, RuleNoDataAvailableViewComponent,
  RulesTabContentInlineDetailViewComponent
} from './components';
import { BrandContentComponent, PriceContentComponent, ProductNumberContentComponent } from './components/rules-tab-contents';

export const ENTRY_COMPONENTS = [];

/**
 * Export all shared components.
 */
export const COMPONENTS = [
  RuleContextComponent,
  RulesTabContentInlineDetailViewComponent,
  RuleGeneratorComponent,
  RuleConditionGeneratorComponent,
  RuleNoDataAvailableViewComponent,
  BrandContentComponent,
  ProductNumberContentComponent,
  PriceContentComponent
];

/**
 * Export all shared directives.
 */
export const DIRECTIVES = [];

/**
 * Export all shared services.
 */
export const SERVICES = [
  RuleContextDataService,
  RuleContextFormUtility,
  RuleUtilityService,
  RuleService
];

/**
 * Export all shared pipes.
 */
export const PIPES = [];
