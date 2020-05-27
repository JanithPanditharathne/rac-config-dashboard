import { RecSlot } from '../models/rec-slot.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecSlotUtilityService {

  public static mapRecSlotValues(formData: any, rulesList: any): RecSlot {
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
