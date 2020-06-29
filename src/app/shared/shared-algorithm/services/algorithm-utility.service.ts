import { Injectable } from '@angular/core';

import { Algorithm } from '../../../feature/algorithm/models';
import { AlgorithmDropDownItem } from '../models/algorithm-dropdown-item.model';

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

  /**
   * Responsible for set algorithm disable state.
   * @param {AlgorithmDropDownItem[]} mappedAlgorithms
   * @param {Algorithm} selectedAlgorithm
   * @return {AlgorithmDropDownItem[]} dropdown item
   */
  public setAlgorithmDisableState(mappedAlgorithms: AlgorithmDropDownItem[], selectedAlgorithm?: Algorithm): AlgorithmDropDownItem[] {
    if (selectedAlgorithm) {
      return mappedAlgorithms.map((algorithm: AlgorithmDropDownItem) => {
        if (selectedAlgorithm.id === algorithm.id) {
          algorithm.disabled = !algorithm.disabled;
        }
        return algorithm;
      });
    }

    return mappedAlgorithms;
  }

  /**
   * Responsible for map algorithm to dropdown items.
   * @param {Algorithm[]} algorithms
   * @return {AlgorithmDropDownItem[]} dropdown items
   */
  public mapToAlgorithmDropdownItems(algorithms: Algorithm[]): AlgorithmDropDownItem[] {
    return algorithms.map((algorithm: Algorithm) => {
      return {
        id: algorithm.id,
        name: algorithm.name,
        description: algorithm.description,
        defaultDisplayText: algorithm.defaultDisplayText,
        disabled: false,
        mappedAlgorithmName: `${algorithm.name} (ID: ${algorithm.id})`
      };
    });
  }
}
