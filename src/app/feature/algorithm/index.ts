import {
  AlgorithmComponent,
  AlgorithmUpsertComponent
} from './components';

import { AlgorithmResolver } from './resolvers';

/**
 * Export all algorithms components.
 */
export const COMPONENTS = [
  AlgorithmComponent,
  AlgorithmUpsertComponent
];

/**
 * Export all algorithms entry components.
 */
export const ENTRY_COMPONENTS = [];

/**
 * Export all algorithms services.
 */
export const SERVICES = [AlgorithmResolver];
