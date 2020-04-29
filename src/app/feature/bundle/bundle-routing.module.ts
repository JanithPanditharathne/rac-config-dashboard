import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundleComponent } from './components';

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
