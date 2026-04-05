import { Product } from './Product';

export interface Accessory extends Product {
  accessoryType: string;
  fanWidthMM:    number | null;
}
