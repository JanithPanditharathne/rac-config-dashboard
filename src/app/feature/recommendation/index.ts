// components
import { RecommendationComponent, RecommendationUpsertComponent } from './components';

// resolvers
import { RecommendationResolver } from './resolvers';

/**
 * Export all recommendation components.
 */
export const COMPONENTS = [
  RecommendationComponent,
  RecommendationUpsertComponent
];

/**
 * Export all recommendation entry components.
 */
export const ENTRY_COMPONENTS = [];

/**
 * Export all recommendation services.
 */
export const SERVICES = [
  RecommendationResolver
];
