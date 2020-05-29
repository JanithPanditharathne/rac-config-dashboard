import { Injectable } from '@angular/core';

import { RecSlot } from '../models';

@Injectable()
export class RecSlotUtilityService {

  /**
   * Responsible for map form data into rec slot.
   * @param {any} formData data
   * @param {any[]} rulesList rules
   */
  public static mapRecSlotValues(formData: any, rulesList: any[]): RecSlot {
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
}
