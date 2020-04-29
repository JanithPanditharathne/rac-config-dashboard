import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Algorithm } from '../models/algorithm.model';
import { AlgorithmService } from '../services';
import { Observable } from 'rxjs';

@Injectable()
export class AlgorithmResolver implements Resolve<Algorithm> {
  constructor(private algorithmService: AlgorithmService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Algorithm> | Promise<Algorithm> | Algorithm {
    return this.algorithmService.getAlgorithmDetails(Number(route.params.id));
  }
}
