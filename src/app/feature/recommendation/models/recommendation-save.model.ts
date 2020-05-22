import { Bundle } from '../../bundle/models/bundle.model';

export interface RecommendationSave {
  recId?: number;
  name: string;
  bundle: Bundle;
}
