import { Product } from './Product';

export interface CPU extends Product {
  socket: string;
  model: string;
  frequencyGHz: number;
  cores: number;
  threads: number;
  integratedGraphicsModel: string | null;
  tdpWatts: number;
}
