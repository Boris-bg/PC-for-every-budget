import { Product } from './Product';

export interface GPU extends Product {
  chipBrand:          string;
  graphicsProcessor:  string;
  interfaceType:      string;
  memorySizeGB:       number;
  memoryType:         string;
  slotWidth:          number;
  directXVersion:     string;
}
