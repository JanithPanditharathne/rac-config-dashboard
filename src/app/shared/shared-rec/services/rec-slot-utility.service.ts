import { Injectable } from '@angular/core';

import { RecSlot } from '../../../feature/rec-slot/models';
import { Recommendation } from '../../../feature/recommendation/models';
import { RecDropdownItemModel } from '../models/rec-dropdown-item.model';

/**
 * Class representing rec-slot utility service.
 * @class RecSlotUtilityService
 */
@Injectable()
export class RecSlotUtilityService {

  /**
   * Responsible for map form data into rec slot.
   * @param {any} formData data
   * @param {any[]} rulesList rules
   */
  public mapRecSlotValues(formData: any, rulesList: any[]): RecSlot {
    return {
      channel: {
        id: formData.channel.id,
      },
      page: {
        id: formData.page.id,
      },
      placeholder: {
        id: formData.placeholder.id,
      },
      rec: {
        id: formData.recommendation.id,
      },
      rules: rulesList.map((id: string) => {
        return {
          id: Number(id)
        };
      })
    };
  }

  /**
   * Responsible for parse recommendation to rec drop down item.
   * @param {Recommendation} recommendation
   * @return {RecDropdownItemModel} dropdown item
   */
  public parseRecSlotDropdownItem(recommendation: Recommendation): RecDropdownItemModel {
    return {
      id: recommendation.id,
      name: recommendation.name,
      mappedRecName: `${recommendation.name} (ID: ${recommendation.id})`
    }
  }
}
