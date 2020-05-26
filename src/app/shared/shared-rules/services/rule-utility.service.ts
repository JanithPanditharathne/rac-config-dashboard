import { Injectable } from '@angular/core';
import { DropDownDataItem } from '../../shared-common/models';

@Injectable()
export class RuleUtilityService {

  private _ruleTypes: DropDownDataItem[] = [
    {id: 1, name: 'BOOST'},
    {id: 2, name: 'BURY'},
    {id: 3, name: 'ONLY_RECOMMEND'},
    {id: 4, name: 'DO_NOT_RECOMMEND'},
  ];

  get ruleTypes(): DropDownDataItem[] {
    return this._ruleTypes;
  }

  public mapRuleTypeDropdownData(ruleType: string): DropDownDataItem {
    return this._ruleTypes.find((type: DropDownDataItem) => {
      return type.name == ruleType;
    });
  }
}
