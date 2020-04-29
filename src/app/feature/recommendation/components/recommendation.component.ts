import { Component } from '@angular/core';
import { ActionBreadcrumb } from '../../../shared/shared-common/models';

/**
 * Class representing the Recommendation component.
 * @class RecommendationComponent.
 */
@Component({
  selector: 'app-recommendation',
  styleUrls: ['./recommendation.component.scss'],
  templateUrl: './recommendation.component.html'
})
export class RecommendationComponent {
  public isLoading = false;

  public actionBreadcrumb: ActionBreadcrumb[];

  constructor() {
    this.actionBreadcrumb = [
      {
        path: 'recommendation',
        title: 'Recommendation'
      }
    ];
  }
}
