import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationComponent, RecommendationUpsertComponent } from './components';
import { CanDeactivateGuard } from '../../shared/shared-common/services';
import { FormAction } from '../../shared/shared-common/enums';
import { RecommendationResolver } from './resolvers';

/**
 * Represent application recommendation module routes.
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
    component: RecommendationComponent,
    path: 'list'
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RecommendationUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RecommendationUpsertComponent,
    path: 'edit/:id',
    resolve: {
      rec: RecommendationResolver
    },
    data: {
      formAction: FormAction.EDIT,
    }
  }
];

/**
 * Application recommendation routing module.
 * @class RecommendationModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class RecommendationRoutingModule {
}
