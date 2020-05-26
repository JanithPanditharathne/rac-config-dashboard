import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import {
  BrandContentComponent,
  PriceContentComponent,
  ProductNumberContentComponent,
} from '../rules-tab-contents';

import { RuleIfExpressionDataItem } from '../../../shared-common/models';

import { RuleGeneratorType, RuleTabDisplayDataType, RulesTabTitle } from '../../enums';
import { FormValidator } from '../../../shared-common/services';

/**
 * Component class to represent application rule context.
 * @implements OnInit
 * @class RuleContextComponent
 */
@Component({
  selector: 'app-rule-context',
  styleUrls: ['./rule-context.component.scss'],
  templateUrl: './rule-context.component.html'
})
export class RuleContextComponent implements OnInit {
  public RuleGeneratorType = RuleGeneratorType;
  public RulesTabTitle = RulesTabTitle;

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public contextData: RuleIfExpressionDataItem[];

  @Input()
  public ruleGeneratorType: RuleGeneratorType;

  constructor(private fb: FormBuilder) {
  }

  /**
   * ngOnInit Event Handler.
   */
  public ngOnInit(): void {
    if (this.contextData) {
      this.processContext();
    }
  }

  /**
   * Process context data and set boost tab content data.
   */
  private processContext(): void {
    const context = this.parentFormGroup.get(this.ruleGeneratorType) as FormArray;

    this.contextData.forEach((item: any) => {
      switch (item.type) {
        case RuleTabDisplayDataType.Brand:
          context.push(BrandContentComponent.buildFormGroup(this.fb, item));
          break;

        case RuleTabDisplayDataType.ProductNumber:
          context.push(ProductNumberContentComponent.buildFormGroup(this.fb, item));
          break;

        case RuleTabDisplayDataType.Price:
          context.push(PriceContentComponent.buildExactPriceGroup(this.fb, item));
          break;
      }
    });
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.parentFormGroup.get(controlName));
  }
}
