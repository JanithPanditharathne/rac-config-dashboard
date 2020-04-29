import { Component } from '@angular/core';
import { ActionBreadcrumb } from '../../../shared/shared-common/models';

/**
 * Class representing the Rec slot component.
 * @class RecSlotComponent.
 */
@Component({
  selector: 'app-rec-slot',
  styleUrls: ['./rec-slot.component.scss'],
  templateUrl: './rec-slot.component.html'
})
export class RecSlotComponent {
  public isLoading = false;

  public actionBreadcrumb: ActionBreadcrumb[];

  constructor() {
    this.actionBreadcrumb = [
      {
        path: 'rec-slots',
        title: 'Rec Slots'
      }
    ];
  }
}
