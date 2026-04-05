import { Product } from './Product';
import { Socket } from './Socket';

export interface Cooler extends Product {
  coolingType: string;
  socket:      Socket;
  fanWidthMM:  number;
}
