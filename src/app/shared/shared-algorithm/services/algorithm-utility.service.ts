import { Injectable } from '@angular/core';
import { Algorithm } from '../../../feature/algorithm/models/algorithm.model';

@Injectable()
export class AlgorithmUtilityService {

  public static mapAlgorithmList(algorithms: Algorithm[]): Algorithm[] {
    return algorithms.map((algorithm: Algorithm, index: number) => {
      return {
        rank: index,
        id: algorithm.id,
        name: algorithm.name,
        defaultDisplayText: algorithm.defaultDisplayText,
        customDisplayText: algorithm.customDisplayText || null
      } as Algorithm;
    });
  }
}
