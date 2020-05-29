import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  InternalServerErrorComponent,
  LoadFailureComponent,
  LoginComponent,
  PageNotFoundComponent,
  UnauthorizedComponent
} from './core/components';
import { AppMainComponent } from './main/components';

import { CanDeactivateGuard } from './shared/shared-common/services';

import { AuthGuard, LoginGuard } from './core/guards';

/**
 * Represent application main routes.
 * @type Routes
 */
const appRoutes: Routes = [
  {
    component: InternalServerErrorComponent,
    path: 'server-error'
  },
  {
    component: UnauthorizedComponent,
    path: 'unauthorized'
  },
  {
    component: LoadFailureComponent,
    path: 'load-failure'
  },
  {
    canActivate: [LoginGuard],
    component: LoginComponent,
    path: 'login'
  },
  {
    canActivate: [AuthGuard],
    component: AppMainComponent,
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    path: '',
  },
  {
    component: PageNotFoundComponent,
    path: '**'
  }
];

/**
 * Application routing module.
 * @class AppRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [CanDeactivateGuard]
})
export class AppRoutingModule {
}
