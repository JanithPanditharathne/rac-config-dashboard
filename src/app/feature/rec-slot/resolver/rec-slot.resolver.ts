import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RecSlot } from '../models';

import { RecSlotsService } from '../services';

/**
 * Class representing algorithm resolver.
 * @class RecSlotResolver
 */
@Injectable()
export class RecSlotResolver implements Resolve<RecSlot> {
  constructor(private readonly recSlotsService: RecSlotsService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<RecSlot> | Promise<RecSlot> | RecSlot {
    return this.recSlotsService.getRecSlotDetails(Number(route.params.id));
  }
}
