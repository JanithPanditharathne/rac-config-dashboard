import { Component } from '@angular/core';
import { ActionBreadcrumb } from '../../../shared/shared-common/models';

/**
 * Class representing the Bundles component.
 * @implements OnDestroy
 * @class BundleComponent.
 */
@Component({
  selector: 'app-bundle',
  styleUrls: ['./bundle.component.scss'],
  templateUrl: './bundle.component.html'
})
export class BundleComponent {
  public isLoading = false;

  public actionBreadcrumb: ActionBreadcrumb[];

  constructor() {
    this.actionBreadcrumb = [
      {
        path: 'bundles',
        title: 'Bundles'
      }
    ];
  }
}
