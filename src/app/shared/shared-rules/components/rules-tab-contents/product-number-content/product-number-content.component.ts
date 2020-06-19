import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RuleProductNumberDataItem } from '../../../../shared-common/models';

import { RuleGeneratorType, RuleTabDisplayDataType } from '../../../enums';
import { ActionType } from '../../../../shared-common/enums';

import { RuleContextDataService } from '../../../services';
import { RuleContextFormUtility } from '../../../services';
import { FormValidator, CustomFormValidator } from '../../../../shared-common/services';

/**
 * Component class to represent tab product number content.
 * @implements OnInit
 * @class ProductNumberContentComponent
 */
@Component({
  selector: 'app-product-number-content',
  styleUrls: ['./product-number-content.component.scss'],
  templateUrl: './product-number-content.component.html'
})
export class ProductNumberContentComponent implements OnInit {
  public ActionType = ActionType;

  public productNumberGroup: FormGroup;
  public baseFormGroup: FormGroup;

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public ruleGeneratorType = RuleGeneratorType.MATCHING;

  @Input()
  public formDataArray: FormArray;

  public static buildFormGroup(fb: FormBuilder, productNumberData?: RuleProductNumberDataItem): FormGroup {
    return RuleContextFormUtility.buildFormGroup(fb, RuleTabDisplayDataType.ProductNumber, productNumberData);
  }

  constructor(private fb: FormBuilder, private ruleContextDataService: RuleContextDataService) {
  }

  /**
   * ngOnInit Event Handler.
   */
  public ngOnInit(): void {
    this.baseFormGroup = this.fb.group({
      productNumber: ['', Validators.pattern(CustomFormValidator.alphanumeric_regex)]
    });

    this.productNumberGroup = this.ruleContextDataService.findFacetFormGroup(this.formDataArray, RuleTabDisplayDataType.ProductNumber);

    if (!this.productNumberGroup) {
      this.productNumberGroup = ProductNumberContentComponent.buildFormGroup(this.fb);
    }
  }

  /**
   * Responsible for receiving the item to be removed.
   * @param {string} data The product number to be removed.
   */
  public onRemove(data: string): void {
    this.ruleContextDataService.removeTextFieldData(this.formDataArray, this.productNumberGroup, data);
  }

  /**
   * Trigger on apply event.
   */
  public onApply(): void {
    this.ruleContextDataService.applyTextFieldData(this.formDataArray, this.productNumberGroup, this.baseFormGroup, 'productNumber');
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    const formControl = this.baseFormGroup.get(controlName);
    return formControl.value && FormValidator.isInvalidControl(formControl);
  }

  /**
   * Check whether productNumber field empty or invalid.
   * @returns {boolean} true or false.
   */
  public isDisabled(): boolean {
    const formControl = this.baseFormGroup.get('productNumber');
    return !formControl.value || formControl.invalid;
  }
}
