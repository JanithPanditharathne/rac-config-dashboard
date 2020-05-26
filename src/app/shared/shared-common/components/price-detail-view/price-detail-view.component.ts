import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

/**
 * Component class to represent price rule details.
 * @class PriceDetailViewComponent
 */
@Component({
  selector: 'app-price-detail-view',
  styleUrls: ['./price-detail-view.component.scss'],
  templateUrl: './price-detail-view.component.html'
})
export class PriceDetailViewComponent {

  /**
   * Input to represent the rule price data in a grid row.
   * The priceItem can be either RuleSalePriceStatusDataItem or RuleExactPriceItem
   * or RuleSeedPriceItem or RuleMeanPriceItem or RuleMeanPriceItem
   */
  @Input()
  public priceItem: any;

  @ContentChild('actionTemplate', {static: false})
  public actionTemplate: TemplateRef<any>;
}
