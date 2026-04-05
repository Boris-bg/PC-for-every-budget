import {Product} from './Product';
import {Socket} from './Socket';

export interface CPU extends Product {
  socket: Socket;
  model: string;
  frequencyGHz: number;
  cores: number;
  threads: number;
  integratedGraphicsModel: string | null;
  tdpWatts: number;
}
