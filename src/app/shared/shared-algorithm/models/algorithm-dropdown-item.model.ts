import { Algorithm } from '../../../feature/algorithm/models';

/**
 * Interface representing algorithm dropdown model.
 * @interface AlgorithmDropDownItem.
 */
export interface AlgorithmDropDownItem extends Algorithm {
  disabled: boolean;
  mappedAlgorithmName: string;
}
