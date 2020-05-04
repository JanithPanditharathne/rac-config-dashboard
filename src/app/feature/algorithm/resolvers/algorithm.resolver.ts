import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Algorithm } from '../models/algorithm.model';
import { Observable } from 'rxjs';
import { AlgorithmService } from '../../../shared/shared-algorithm/services';

@Injectable()
export class AlgorithmResolver implements Resolve<Algorithm> {
  constructor(private algorithmService: AlgorithmService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Algorithm> | Promise<Algorithm> | Algorithm {
    return this.algorithmService.getAlgorithmDetails(Number(route.params.id));
  }
}
