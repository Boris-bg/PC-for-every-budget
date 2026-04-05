import { Product } from './Product';
import { Interface } from './Interface';

export interface Mouse extends Product {
  connectionType:     string;
  maxDpi:             number;
  interfaceType:      Interface;
  color:              string;
  suitableForLeftHand:boolean;
}
