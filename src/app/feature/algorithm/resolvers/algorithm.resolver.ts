import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Algorithm } from '../models';

import { AlgorithmService } from '../../../shared/shared-algorithm/services';

/**
 * Class representing algorithm resolver.
 * @class AlgorithmResolver
 */
@Injectable()
export class AlgorithmResolver implements Resolve<Algorithm> {
  constructor(private algorithmService: AlgorithmService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Algorithm> | Promise<Algorithm> | Algorithm {
    return this.algorithmService.getAlgorithmDetails(Number(route.params.id));
  }
}
