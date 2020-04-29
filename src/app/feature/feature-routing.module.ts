import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Represent application feature module routes.
 * @type Routes
 */
const featureRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rec-slots'
  },
  {
    loadChildren: () => import('./rec-slot/rec-slot.module').then(m => m.RecSlotModule),
    path: 'rec-slots'
  },
  {
    loadChildren: () => import('./rule/rule.module').then(m => m.RuleModule),
    path: 'rules'
  },
  {
    loadChildren: () => import('./recommendation/recommendation.module').then(m => m.RecommendationModule),
    path: 'recommendation'
  },
  {
    loadChildren: () => import('./algorithm/algorithm.module').then(m => m.AlgorithmModule),
    path: 'algorithms'
  },
  {
    loadChildren: () => import('./bundle/bundle.module').then(m => m.BundleModule),
    path: 'bundles'
  }
];

/**
 * Application feature routing module.
 * @class FeatureRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class FeatureRoutingModule {
}
