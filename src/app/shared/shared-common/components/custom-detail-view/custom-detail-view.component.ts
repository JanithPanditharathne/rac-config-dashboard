import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

/**
 * Component class to represent custom rule details.
 * @class CustomDetailViewComponent
 */
@Component({
  selector: 'app-custom-detail-view',
  styleUrls: ['./custom-detail-view.component.scss'],
  templateUrl: './custom-detail-view.component.html'
})
export class CustomDetailViewComponent {

  /**
   * Input to represent the rule custom data in a grid row.
   */
  @Input()
  public customItem: any;

  @ContentChild('actionTemplate', {static: false})
  public actionTemplate: TemplateRef<any>;
}
