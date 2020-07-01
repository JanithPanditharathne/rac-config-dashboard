import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { RuleThenExpressionDataItem } from '../../../shared-common/models';

import { RuleGeneratorType, RuleTabDisplayDataType, RulesTabTitle } from '../../enums';

import { FormValidator, MetaDataService } from '../../../shared-common/services';

import {
  BrandContentComponent,
  CustomContentComponent,
  PriceContentComponent,
  ProductNumberContentComponent
} from '../rules-tab-contents';

/**
 * Component class to represent application rule action context.
 * @implements OnInit
 * @class RuleActionContextComponent
 */
@Component({
  selector: 'app-rule-action-context',
  styleUrls: ['./rule-action-context.component.scss'],
  templateUrl: './rule-action-context.component.html'
})
export class RuleActionContextComponent implements OnInit {
  public RuleGeneratorType = RuleGeneratorType;
  public RulesTabTitle = RulesTabTitle;

  public ruleGeneratorType = RuleGeneratorType.ACTION;
  public metadataTypes: string[];

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public contextData: RuleThenExpressionDataItem[];


  constructor(private readonly fb: FormBuilder,
              private readonly metaDataService: MetaDataService
  ) {
    metaDataService.metadataTypes.subscribe((types: string[]) => {
      this.metadataTypes = types;
    });
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

        case RuleTabDisplayDataType.Custom:
          context.push(CustomContentComponent.buildFormGroup(this.fb, item));
          break;
      }
    });
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.parentFormGroup.get(controlName));
  }
}
