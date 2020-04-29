// components
import {
  SidePaneComponent,
  TableActionsColumnComponent,
  TabSetComponent,
  ActionBarComponent,
  AppLoadingOverlayComponent,
  RangeErrorComponent,
  TableActionComponent,
  ActionComponent,
  TabComponent,
  AlertPopupComponent,
  ConfirmPopupComponent,
  ActionButtonStrapComponent,
  RequiredErrorComponent,
  CommonControlErrorViewComponent,
  CharacterLengthRangeErrorComponent,
} from './components';

// directives
import { ContainerResponsiveDirective, ErrorFocusDirective } from './directives';

// pipes
import { DateFormatPipe } from './pipes';

/**
 * Export all shared entry components.
 */
export const ENTRY_COMPONENTS = [ConfirmPopupComponent];

/**
 * Export all shared components.
 */
export const COMPONENTS = [
  SidePaneComponent,
  TableActionsColumnComponent,
  TabSetComponent,
  ActionBarComponent,
  RequiredErrorComponent,
  RangeErrorComponent,
  AppLoadingOverlayComponent,
  TableActionComponent,
  ActionComponent,
  TabComponent,
  AlertPopupComponent,
  ConfirmPopupComponent,
  ActionButtonStrapComponent,
  CommonControlErrorViewComponent,
  CharacterLengthRangeErrorComponent
];

/**
 * Export all shared directives.
 */
export const DIRECTIVES = [ContainerResponsiveDirective, ErrorFocusDirective];

/**
 * Export all shared services.
 */
export const SERVICES = [
];

/**
 * Export all shared pipes.
 */
export const PIPES = [DateFormatPipe];
