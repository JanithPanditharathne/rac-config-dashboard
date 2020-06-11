import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { DropdownSelectMode } from 'ornamentum';

import { DropDownDataItem, RuleBrandDataItem } from '../../../../shared-common/models';

import { ActionType } from '../../../../shared-common/enums';
import { RuleGeneratorType, RuleTabDisplayDataType } from '../../../enums';

import { RuleContextFormUtility, RuleContextDataService } from '../../../services';
import { FormValidator, MetaDataService } from '../../../../shared-common/services';

/**
 * Component class to represent brand tab content.
 * @implements OnInit
 * @class BrandContentComponent
 */
@Component({
  selector: 'app-brand-content',
  styleUrls: ['./brand-content.component.scss'],
  templateUrl: './brand-content.component.html'
})
export class BrandContentComponent implements OnInit {
  public ActionType = ActionType;

  public brandFormGroup: FormGroup;
  public baseFormGroup: FormGroup;
  public brands: DropDownDataItem[];

  @Input()
  public ruleGeneratorType = RuleGeneratorType.MATCHING;

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public formDataArray: FormArray;

  public static buildFormGroup(fb: FormBuilder, brandData?: RuleBrandDataItem): FormGroup {
    return RuleContextFormUtility.buildFormGroup(fb, RuleTabDisplayDataType.Brand, brandData);
  }

  constructor(
    private fb: FormBuilder,
    private metaDataService: MetaDataService,
    private ruleContextDataService: RuleContextDataService) {
    metaDataService.brands.subscribe((brands: DropDownDataItem[]) => {
      this.brands = brands;
    });
  }

  /**
   * ngOnInit Event Handler.
   */
  public ngOnInit(): void {
    this.baseFormGroup = this.fb.group({
      brand: [null]
    });

    this.brandFormGroup = this.ruleContextDataService.findFacetFormGroup(this.formDataArray, RuleTabDisplayDataType.Brand);

    if (!this.brandFormGroup) {
      this.brandFormGroup = BrandContentComponent.buildFormGroup(this.fb);
    }
  }

  /**
   * Trigger on apply event for the selected data in the text field components.
   */
  public onApply(): void {
    this.ruleContextDataService.applyTextFieldData(this.formDataArray, this.brandFormGroup, this.baseFormGroup, 'brand');
  }

  /**
   * Responsible for receiving the item to be removed.
   * @param {string} data The age appropriation data of the item to be removed.
   */
  public onRemove(data: string): void {
    this.ruleContextDataService.removeTextFieldData(this.formDataArray, this.brandFormGroup, data);
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.baseFormGroup.get(controlName));
  }
}
