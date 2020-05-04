import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmComponent, AlgorithmUpsertComponent } from './components';
import { FormAction } from '../../shared/shared-common/enums';
import { AlgorithmResolver } from './resolvers';

/**
 * Represent application algorithm module routes.
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
    component: AlgorithmComponent,
    path: 'list'
  },
  {
    canActivate: [],
    canDeactivate: [],
    component: AlgorithmUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [],
    component: AlgorithmUpsertComponent,
    path: 'edit/:id',
    resolve: {
      algorithm: AlgorithmResolver
    },
    data: {
      formAction: FormAction.EDIT,
    }
  }
];

/**
 * Application algorithm routing module.
 * @class AlgorithmRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class AlgorithmRoutingModule {
}
