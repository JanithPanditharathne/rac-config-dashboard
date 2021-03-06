import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { DropDownDataItem } from '../../shared-common/models';

import { RuleTabDisplayDataType } from '../enums';

/**
 * Rule based facet form data service.
 * @class RuleContextDataService.
 */
@Injectable()
export class RuleContextDataService {
  constructor() {
  }

  /**
   * Returns true if the current context child's type item is matched to the Price type.
   * @param {string} ruleDisplayType The rule display type.
   * @returns {boolean} True/False.
   */
  public isPriceType(ruleDisplayType: string): boolean {
    return (
      ruleDisplayType === RuleTabDisplayDataType.Price
    );
  }

  /**
   * Returns true if the current context child's type item is matched to the Custom type.
   * @param {string} ruleDisplayType The rule display type.
   * @returns {boolean} True/False.
   */
  public isCustomType(ruleDisplayType: string): boolean {
    return (
      ruleDisplayType === RuleTabDisplayDataType.Custom
    );
  }

  /**
   * Responsible for find and return facet form group.
   * @param {FormArray} formDataArray
   * @param {RuleTabDisplayDataType} type
   * @return {FormGroup} form group
   */
  public findFacetFormGroup(formDataArray: FormArray, type: RuleTabDisplayDataType): FormGroup {
    return formDataArray.controls.find((item: AbstractControl) => {
      return item.value.type === type;
    }) as FormGroup;
  }

  /**
   * Responsible for find and return custom form group.
   * @param {FormArray} formDataArray
   * @param {string} key
   * @param {string} operator
   * @return {FormGroup} form group
   */
  public findCustomFormGroup(formDataArray: FormArray, key: string, operator: string): FormGroup {
    return formDataArray.controls.find((item: AbstractControl) => {
      return item.value.value.key && item.value.value.key === key && item.value.operator === operator;
    }) as FormGroup;
  }

  /**
   * Responsible for apply facet dropdown data.
   * @param {FormArray} formDataArray
   * @param {FormGroup} facetFormGroup
   * @param {FormGroup} baseFormGroup
   */
  public applyFacetDropDownData(formDataArray: FormArray, facetFormGroup: FormGroup, baseFormGroup: FormGroup): void {
    const index = formDataArray.controls.indexOf(facetFormGroup);

    if (index === -1) {
      formDataArray.push(facetFormGroup);
    }

    formDataArray.markAsDirty();
    const facetData = facetFormGroup.value.value || [];

    facetFormGroup.patchValue({
      value: [...facetData, ...baseFormGroup.value.value]
    });

    baseFormGroup.reset();
  }

  /**
   * Responsible for remove facet dropdown data.
   * @param {FormArray} formDataArray
   * @param {FormGroup} group
   * @param {DropDownDataItem} data
   */
  public removeFacetDropDownData(formDataArray: FormArray, group: FormGroup, data: DropDownDataItem): void {
    const dropDownData: DropDownDataItem[] = [...group.value.value];

    if (dropDownData.length === 1) {
      const dropDownDataValueIndex = formDataArray.controls.indexOf(group);
      formDataArray.removeAt(dropDownDataValueIndex);
    }

    formDataArray.markAsDirty();
    const index = dropDownData.findIndex((item: DropDownDataItem) => {
      return item.id === data.id;
    });

    dropDownData.splice(index, 1);

    group.patchValue({
      value: dropDownData
    });
  }

  /**
   * Responsible for remove text field data.
   * @param {FormArray} formDataArray
   * @param {FormGroup} formGroup
   * @param {string} data
   */
  public removeTextFieldData(formDataArray: FormArray, formGroup: FormGroup, data: string): void {
    const formGroupValue = formGroup.value;

    if (formGroupValue.value.length === 1) {
      const searchTermGroupIndex = formDataArray.controls.indexOf(formGroup);
      formDataArray.removeAt(searchTermGroupIndex);
    }

    formDataArray.markAsDirty();
    const index = formGroupValue.value.indexOf(data);

    const formGroupData = [...formGroupValue.value];
    formGroupData.splice(index, 1);

    formGroup.patchValue({
      value: formGroupData
    });
  }

  /**
   * Responsible for apply text field data.
   * @param {FormArray} formDataArray
   * @param {FormGroup} group
   * @param {string} baseFormGroup
   * @param {string} type
   */
  public applyTextFieldData(formDataArray: FormArray, group: FormGroup, baseFormGroup: FormGroup, type: string): void {
    const currentValues: any[] = group.get('value').value || [];

    if (currentValues && !currentValues.includes(baseFormGroup.value[type])) {
      const index = formDataArray.controls.indexOf(group);

      if (index === -1) {
        formDataArray.push(group);
      }

      formDataArray.markAsDirty();

      const formGroupValueFormControl = group.get('value');
      const formGroupValue = formGroupValueFormControl.value || [];

      formGroupValueFormControl.setValue([...formGroupValue, baseFormGroup.value[type]]);

      baseFormGroup.get(type).reset();
    }
  }
}
