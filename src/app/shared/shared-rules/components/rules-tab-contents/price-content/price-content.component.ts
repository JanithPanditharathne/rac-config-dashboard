import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DropdownSelectMode } from 'ornamentum';

import {
  RuleContextOperatorData, RuleExactPriceDataItem,
} from '../../../../shared-common/models';
import { RulePriceDataItem } from '../../../../shared-common/models/rule/rule-price-data-item.model';

import { ActionType } from '../../../../shared-common/enums';
import { RuleGeneratorType, RuleTabDisplayDataType, RuleTabInlineDataGeneratorType } from '../../../enums';

import { RuleContextFormUtility } from '../../../services';
import { FormValidator, CustomFormValidator } from '../../../../shared-common/services';

/**
 * Component class to represent tab price content.
 * @implements OnInit
 * @class PriceContentComponent
 */
@Component({
  selector: 'app-price-content',
  styleUrls: ['./price-content.component.scss'],
  templateUrl: './price-content.component.html'
})
export class PriceContentComponent implements OnInit {
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public RuleTabInlineDataGeneratorType = RuleTabInlineDataGeneratorType;
  public ActionType = ActionType;

  public operators: RuleContextOperatorData[] = RuleContextFormUtility.priceOperators;

  public priceGroup: FormGroup;

  @Input()
  public ruleGeneratorType = RuleGeneratorType;

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public formDataArray: FormArray;

  /**
   * Responsible for build form group.
   */
  public static buildExactPriceGroup(fb: FormBuilder, exactPriceData?: RuleExactPriceDataItem): FormGroup {
    return RuleContextFormUtility.buildFormGroup(fb, RuleTabDisplayDataType.Price, exactPriceData);
  }

  constructor(private fb: FormBuilder) {
  }

  /**
   * ngOnInit Event Handler.
   */
  public ngOnInit(): void {
    this.priceGroup = this.initPriceFormGroup();
  }

  /**
   * Trigger on exact price apply event.
   * Adds new form control with the current exact price value.
   */
  public onApplyExactPrice(): void {
    const exactPriceFormGroup = PriceContentComponent.buildExactPriceGroup(this.fb);

    const exactPriceValue = this.priceGroup.value.exactPrice;
    if (!this.isExistingPriceCondition(exactPriceValue)) {

      exactPriceFormGroup.patchValue({
        operator: exactPriceValue.operator.type,
        value: {
          price: exactPriceValue.price
        }
      });

      this.formDataArray.push(exactPriceFormGroup);
      this.formDataArray.markAsDirty();

      this.priceGroup.get('exactPrice').reset({
        operator: this.operators[0],
        price: ''
      });
    }
  }

  /**
   * Responsible for receiving the item to be removed.
   * @param {RuleExactPriceDataItem} data
   * The price data item to be removed.
   */
  public onRemove(data: RuleExactPriceDataItem): void {
    const index = this.formDataArray.value.indexOf(data);
    this.formDataArray.removeAt(index);
    this.formDataArray.markAsDirty();
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    const formControl = this.priceGroup.get(controlName);
    return formControl.value && FormValidator.isInvalidControl(formControl);
  }

  /**
   * Responsible for check availability of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isDisabled(controlName: string): boolean {
    const formControl = this.priceGroup.get(controlName);
    return !formControl.value || formControl.invalid;
  }

  /**
   * Create price form group element.
   * @returns {FormGroup} The FormGroup element.
   */
  private initPriceFormGroup(): FormGroup {
    return this.fb.group({
      exactPrice: this.fb.group({
        operator: this.operators[0],
        price: [
          null,
          Validators.required
        ]
      })
    });
  }

  /**
   * Responsible for check whether exact price value already exists.
   * @param {any} exactPriceValue
   * @return {boolean} true or false
   */
  private isExistingPriceCondition(exactPriceValue: any): boolean {
    const formArrayValues: any[] = this.formDataArray.value || [];

    return formArrayValues.some((priceDataItem: RulePriceDataItem) => {
      return priceDataItem.value.price === exactPriceValue.price &&
        priceDataItem.operator === exactPriceValue.operator.type;
    });
  }
}
