import { Bundle } from '../../bundle/models/bundle.model';

/**
 * Interface representing recommendation model.
 * @interface Recommendation.
 */
export interface Recommendation {
  id?: number;
  name: string;
  bundle: Bundle;
}
