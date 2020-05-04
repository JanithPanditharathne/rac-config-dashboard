import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bundle } from '../models/bundle.model';
import { BundleService } from '../../../shared/shared-bundle/services';

@Injectable()
export class BundleResolver implements Resolve<Bundle> {
  constructor(private bundleService: BundleService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Bundle> | Promise<Bundle> | Bundle {
    return this.bundleService.getBundleDetails(Number(route.params.id));
  }
}
