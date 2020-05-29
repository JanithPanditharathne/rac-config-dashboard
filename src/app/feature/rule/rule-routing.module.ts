import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormAction } from '../../shared/shared-common/enums';

import { RuleComponent, RuleUpsertComponent } from './components';

import { CanDeactivateGuard } from '../../shared/shared-common/services';

import { RuleResolver } from './resolvers';

/**
 * Represent application rule module routes.
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
    component: RuleComponent,
    path: 'list'
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RuleUpsertComponent,
    path: 'add',
    data: {
      formAction: FormAction.ADD,
    }
  },
  {
    canActivate: [],
    canDeactivate: [CanDeactivateGuard],
    component: RuleUpsertComponent,
    path: 'edit/:id',
    resolve: {
      rule: RuleResolver
    },
    data: {
      formAction: FormAction.EDIT,
    }
  }
];

/**
 * Application rule routing module.
 * @class RuleRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class RuleRoutingModule {
}
