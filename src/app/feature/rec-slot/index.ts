import { RecSlotComponent, RecSlotDetailViewComponent, RecSlotUpsertComponent } from './components';

import { RecSlotsService } from './services';

import { RecSlotResolver } from './resolver';

/**
 * Export all rec-slot components.
 */
export const COMPONENTS = [
  RecSlotComponent,
  RecSlotUpsertComponent,
  RecSlotDetailViewComponent
];

/**
 * Export all rec-slot entry components.
 */
export const ENTRY_COMPONENTS = [];

/**
 * Export all rec-slot services.
 */
export const SERVICES = [
  RecSlotsService,
  RecSlotResolver
];
