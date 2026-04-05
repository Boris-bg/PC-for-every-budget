import { Product } from './Product';

export interface ROM extends Product {
  storageType:   string;
  memorySizeGB:  number;
  formFactor:    string;
  interfaceType: string;
}
