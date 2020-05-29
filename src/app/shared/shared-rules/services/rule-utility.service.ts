import { Injectable } from '@angular/core';

import { DropDownDataItem } from '../../shared-common/models';

/**
 * Class representing rule utility service.
 * @class RuleUtilityService.
 */
@Injectable()
export class RuleUtilityService {

  private ruleTypeList: DropDownDataItem[] = [
    {id: 1, name: 'BOOST'},
    {id: 2, name: 'BURY'},
    {id: 3, name: 'ONLY_RECOMMEND'},
    {id: 4, name: 'DO_NOT_RECOMMEND'},
  ];

  /**
   * Responsible for return value of rule types.
   * @return {DropDownDataItem[]} rule types
   */
  public get ruleTypes(): DropDownDataItem[] {
    return this.ruleTypeList;
  }

  /**
   * Responsible to map give rule type to drop down data.
   * @param {string} ruleType
   * @return {DropDownDataItem} dropdown data item
   */
  public mapRuleTypeDropdownData(ruleType: string): DropDownDataItem {
    return this.ruleTypeList.find((type: DropDownDataItem) => {
      return type.name == ruleType;
    });
  }
}
