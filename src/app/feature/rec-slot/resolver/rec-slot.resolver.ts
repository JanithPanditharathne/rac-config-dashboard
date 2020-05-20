import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecSlot } from '../models/rec-slot.model';
import { RecSlotsService } from '../services';

@Injectable()
export class RecSlotResolver implements Resolve<RecSlot> {
  constructor(private recSlotsService: RecSlotsService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<RecSlot> | Promise<RecSlot> | RecSlot {
    return this.recSlotsService.getRecSlotDetails(Number(route.params.id));
  }
}
