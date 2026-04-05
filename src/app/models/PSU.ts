import { Product } from './Product';

export interface PSU extends Product {
  powerWatts:  number;
  formFactor:  string;
  efficiency:  string;
  category:    string;
  hasPfc:      boolean;
  wiringType:  string;
}
