import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RuleAdditionalDataViewType, RuleTabInlineDataGeneratorType } from '../../enums';
import { ActionType } from '../../../shared-common/enums';

import { RuleContextDataService } from '../../services';

/**
 * Component class to represent the inline detail view of the rules tab contents.
 * @class RulesTabContentInlineDetailViewComponent
 */
@Component({
  selector: 'app-rules-tab-content-inline-detail-view',
  styleUrls: ['./rules-tab-content-inline-detail-view.component.scss'],
  templateUrl: './rules-tab-content-inline-detail-view.component.html'
})
export class RulesTabContentInlineDetailViewComponent {
  public AdditionalDataViewType = RuleAdditionalDataViewType;
  public RuleTabInlineDataGeneratorType = RuleTabInlineDataGeneratorType;
  public ActionType = ActionType;

  /**
   * Input data used to show tab inside rule information.
   */
  @Input()
  public formGroupData: any;

  /**
   * Input data used to show tab inside rule information.
   */
  @Input()
  public formArrayData: any;

  @Input()
  public displayType: RuleTabInlineDataGeneratorType;

  /**
   * Output data for the inline details of the expanded tab views.
   */
  @Output()
  public onRemoved = new EventEmitter<any>();

  constructor(private ruleContextDataService: RuleContextDataService) {
  }

  /**
   * Triggers when clicking remove button.
   * Emit the id of the item to be removed.
   * @param item
   */
  public onRemoveItem(item: any): void {
    this.onRemoved.emit(item);
  }

  /**
   * Returns true if the current context child's type item is matched to the Price type.
   * @param {string} ruleDisplayType The rule display type.
   * @returns {boolean} True/False.
   */
  public isPriceType(ruleDisplayType: string): boolean {
    return this.ruleContextDataService.isPriceType(ruleDisplayType);
  }
}
