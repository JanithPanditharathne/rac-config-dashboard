import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataTableRow } from 'ornamentum';

import { RecSlot } from '../../models';
import { DisplayRule, Rule } from '../../../rule/models';
import { DropDownDataItem } from '../../../../shared/shared-common/models';

import { RuleService } from '../../../../shared/shared-rules/services';

/**
 * Class representing the Rec slot detail view component.
 * @class RecSlotDetailViewComponent.
 */
@Component({
  selector: 'app-rec-slot-detail-view',
  styleUrls: ['./rec-slot-detail-view.component.scss'],
  templateUrl: './rec-slot-detail-view.component.html'
})
export class RecSlotDetailViewComponent implements OnInit, OnDestroy {
  public recSlot: RecSlot;
  public isLoading = true;
  public rules: Rule[] = [];
  public rulesServiceSubscription: Subscription;

  @Input()
  public bundleID: number;

  @Input()
  public dataRow: DataTableRow<RecSlot>;

  constructor(
    private ruleService: RuleService,
  ) {
  }

  /**
   * On component initialization.
   */
  public ngOnInit(): void {
    this.recSlot = this.dataRow.item;
    this.fetchRuleDetails();
  }

  /**
   * Fetch and filter rule details.
   */
  private fetchRuleDetails(): void {
    this.rulesServiceSubscription = this.ruleService.getRules().subscribe((displayRule: DisplayRule) => {
      this.rules = displayRule.rules.filter((rule: Rule) => {
        return this.recSlot.rules.find((ruleItem: DropDownDataItem) => rule.id === String(ruleItem.id));
      });
      this.isLoading = false;
    });
  }

  /**
   * On component destroy.
   */
  public ngOnDestroy(): void {
    if (this.rulesServiceSubscription) {
      this.rulesServiceSubscription.unsubscribe();
    }
  }
}
