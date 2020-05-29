import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Recommendation } from '../models';

import { RecommendationService } from '../../../shared/shared-rec/services';

/**
 * Class representing recommendation resolver.
 * @class RecommendationResolver
 */
@Injectable()
export class RecommendationResolver implements Resolve<Recommendation> {
  constructor(private recommendationService: RecommendationService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Recommendation> | Promise<Recommendation> | Recommendation {
    return this.recommendationService.getRecDetails(Number(route.params.id));
  }
}
