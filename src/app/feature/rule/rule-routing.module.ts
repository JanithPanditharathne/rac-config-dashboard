import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleComponent } from './components';

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
