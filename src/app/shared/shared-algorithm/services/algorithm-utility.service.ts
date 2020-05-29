import { Injectable } from '@angular/core';

import { Algorithm } from '../../../feature/algorithm/models';

/**
 * Class representing algorithm utility service.
 * @class AlgorithmUtilityService
 */
@Injectable()
export class AlgorithmUtilityService {

  /**
   * Responsible for map list of algorithms to selectable algorithms.
   * @param {Algorithm[]} algorithms
   * @return {Algorithm[]} list of selectable algorithms
   */
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
