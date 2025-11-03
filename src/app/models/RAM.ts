import {Product} from './Product';

export interface RAM extends Product {
  memorySizeGB: number;
  type: string;
  speedMHz: number;
  isKIT: boolean;
  isRGB: boolean;
}
