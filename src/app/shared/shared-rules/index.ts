/**
 * Export all shared entry components.
 */
import { RuleContextDataService, RuleContextFormUtility, RuleService, RuleUtilityService } from './services';

import {
  RuleConditionGeneratorComponent,
  RuleMatchingContextComponent,
  RuleGeneratorComponent,
  RuleNoDataAvailableViewComponent,
  RulesTabContentInlineDetailViewComponent,
  RuleActionContextComponent
} from './components';

import {
  BrandContentComponent,
  CustomContentComponent,
  PriceContentComponent,
  ProductNumberContentComponent
} from './components/rules-tab-contents';

export const ENTRY_COMPONENTS = [];

/**
 * Export all shared components.
 */
export const COMPONENTS = [
  RuleMatchingContextComponent,
  RuleActionContextComponent,
  RulesTabContentInlineDetailViewComponent,
  RuleGeneratorComponent,
  RuleConditionGeneratorComponent,
  RuleNoDataAvailableViewComponent,
  BrandContentComponent,
  CustomContentComponent,
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
