import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormAction } from '../../shared/shared-common/enums';

import { BundleComponent, BundleUpsertComponent } from './components';

import { BundleResolver } from './resolvers';

import { CanDeactivateGuard } from '../../shared/shared-common/services';

/**
 * Represent application bundle module routes.
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
    component: BundleComponent,
    path: 'list'
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: BundleUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: BundleUpsertComponent,
    path: 'edit/:id',
    resolve: {
      bundle: BundleResolver
    },
    data: {
      formAction: FormAction.EDIT,
    }
  }
];

/**
 * Application bundle routing module.
 * @class BundleRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class BundleRoutingModule {
}
