import { Product } from './Product';
import { Interface } from './Interface';

export interface ROM extends Product {
  storageType:   string;
  memorySizeGB:  number;
  formFactor:    string;
  interfaceType: Interface;
}
