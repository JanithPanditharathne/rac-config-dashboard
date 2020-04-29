import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecSlotComponent } from './components';

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
