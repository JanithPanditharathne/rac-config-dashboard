import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { RuleAdditionalDataViewType } from '../../../shared-rules/enums';

/**
 * Component class to represent additional rule details.
 * @class AdditionalDetailViewComponent
 */
@Component({
  selector: 'app-additional-detail-view',
  styleUrls: ['./additional-detail-view.component.scss'],
  templateUrl: './additional-detail-view.component.html'
})
export class AdditionalDetailViewComponent {
  public AdditionalDataViewType = RuleAdditionalDataViewType;

  /**
   * Input to represent the additional rule data in a grid row.
   */
  @Input()
  public data: any;

  /**
   * Input to represent the view type of the additional rule data.
   */
  @Input()
  public viewType: RuleAdditionalDataViewType;

  @ContentChild('actionTemplate', {static: false})
  public actionTemplate: TemplateRef<any>;

  constructor() {
  }
}
