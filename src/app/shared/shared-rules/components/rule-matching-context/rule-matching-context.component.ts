import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { RuleIfExpressionDataItem } from '../../../shared-common/models';

import { RuleGeneratorType, RuleTabDisplayDataType, RulesTabTitle } from '../../enums';

import { FormValidator, MetaDataService } from '../../../shared-common/services';

import {
  BrandContentComponent,
  CustomContentComponent,
  PriceContentComponent,
  ProductNumberContentComponent
} from '../rules-tab-contents';

/**
 * Component class to represent application rule matching context.
 * @implements OnInit
 * @class RuleMatchingContextComponent
 */
@Component({
  selector: 'app-rule-matching-context',
  styleUrls: ['./rule-matching-context.component.scss'],
  templateUrl: './rule-matching-context.component.html'
})
export class RuleMatchingContextComponent implements OnInit {
  public RuleGeneratorType = RuleGeneratorType;
  public RulesTabTitle = RulesTabTitle;

  public ruleGeneratorType = RuleGeneratorType.MATCHING;
  public metadataTypes: string[];

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public contextData: RuleIfExpressionDataItem[];

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
