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
  ExpressionViewComponent,
  PriceDetailViewComponent,
  MathOperatorDetailViewComponent,
  AdditionalDetailViewComponent,
  CustomDetailViewComponent,
} from './components';

// services
import { ConfirmDialogService } from './services/confirm-dialog.service';

// directives
import { ContainerResponsiveDirective, ErrorFocusDirective, TwoDigitDecimalDirective } from './directives';

// pipes
import { MetaDataService } from './services';

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
  ExpressionViewComponent,
  PriceDetailViewComponent,
  MathOperatorDetailViewComponent,
  AdditionalDetailViewComponent,
  AlertPopupComponent,
  ConfirmPopupComponent,
  ActionButtonStrapComponent,
  CommonControlErrorViewComponent,
  CustomDetailViewComponent,
  CharacterLengthRangeErrorComponent
];

/**
 * Export all shared directives.
 */
export const DIRECTIVES = [
  ContainerResponsiveDirective,
  ErrorFocusDirective,
  TwoDigitDecimalDirective
];

/**
 * Export all shared services.
 */
export const SERVICES = [
  ConfirmDialogService,
  MetaDataService
];

/**
 * Export all shared pipes.
 */
export const PIPES = [];
