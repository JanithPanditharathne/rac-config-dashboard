import { Bundle } from '../../bundle/models/bundle.model';

export interface Recommendation {
  id: number;
  name: string;
  bundle: Bundle;
}
