import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormAction } from '../../shared/shared-common/enums';

import { RecSlotComponent, RecSlotUpsertComponent } from './components';

import { RecSlotResolver } from './resolver';

import { CanDeactivateGuard } from '../../shared/shared-common/services';

/**
 * Represent application rec-slot module routes.
 * @type Routes
 */
const featureRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    canActivate: [],
    component: RecSlotComponent,
    path: 'list'
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RecSlotUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RecSlotUpsertComponent,
    path: 'edit/:id',
    resolve: {
      recSlot: RecSlotResolver
    },
    data: {
      formAction: FormAction.EDIT,
    }
  }
];

/**
 * Application rec-slot routing module.
 * @class RecSlotRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class RecSlotRoutingModule {
}
