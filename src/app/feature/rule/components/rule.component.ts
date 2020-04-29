import { Component } from '@angular/core';
import { ActionBreadcrumb } from '../../../shared/shared-common/models';

/**
 * Class representing the Rule component.
 * @class RuleComponent.
 */
@Component({
  selector: 'app-rule',
  styleUrls: ['./rule.component.scss'],
  templateUrl: './rule.component.html'
})
export class RuleComponent {
  public isLoading = false;

  public actionBreadcrumb: ActionBreadcrumb[];

  constructor() {
    this.actionBreadcrumb = [
      {
        path: 'rules',
        title: 'Rules'
      }
    ];
  }
}
