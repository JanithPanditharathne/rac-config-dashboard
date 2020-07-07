import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Bundle } from '../models/bundle.model';

import { BundleService } from '../../../shared/shared-bundle/services';

/**
 * Class representing bundle resolver.
 * @class BundleResolver
 */
@Injectable()
export class BundleResolver implements Resolve<Bundle> {
  constructor(private readonly bundleService: BundleService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Bundle> | Promise<Bundle> | Bundle {
    return this.bundleService.getBundleDetails(Number(route.params.id));
  }
}
