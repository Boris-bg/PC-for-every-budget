import { Product } from './Product';
import { Interface } from './Interface';

export interface GPU extends Product {
  chipBrand:         string;
  graphicsProcessor: string;
  interfaceType:     Interface;  // ← беше string
  memorySizeGB:      number;
  memoryType:        string;
  slotWidth:         number;
  directXVersion:    string;
}
