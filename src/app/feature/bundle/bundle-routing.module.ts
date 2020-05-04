import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundleComponent, BundleUpsertComponent } from './components';
import { FormAction } from '../../shared/shared-common/enums';
import { BundleResolver } from './resolvers';

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
    canDeactivate: [],
    component: BundleUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [],
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
