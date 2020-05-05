// components
import { AlgorithmSelectorComponent, EditDisplayTextComponent } from './components';

// services
import { AlgorithmService, AlgorithmUtilityService } from './services';

// directives

// pipes


/**
 * Export all shared entry components.
 */
export const ENTRY_COMPONENTS = [EditDisplayTextComponent];

/**
 * Export all shared components.
 */
export const COMPONENTS = [
  AlgorithmSelectorComponent,
  EditDisplayTextComponent
];

/**
 * Export all shared directives.
 */
export const DIRECTIVES = [];

/**
 * Export all shared services.
 */
export const SERVICES = [
  AlgorithmService,
  AlgorithmUtilityService
];

/**
 * Export all shared pipes.
 */
export const PIPES = [];
