import { BundleComponent, BundleUpsertComponent } from './components';
import { BundleResolver } from './resolvers';

/**
 * Export all bundle components.
 */
export const COMPONENTS = [
  BundleComponent,
  BundleUpsertComponent
];

/**
 * Export all bundle entry components.
 */
export const ENTRY_COMPONENTS = [];

/**
 * Export all bundle services.
 */
export const SERVICES = [
  BundleResolver
];
