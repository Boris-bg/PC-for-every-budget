import { Product } from './Product';
import { Interface } from './Interface';

export interface Monitor extends Product {
  panelSizeInch:   number;
  aspectRatio:     string;
  resolution:      string;
  refreshRateHz:   number;
  responseTimeMs:  number;
  panelType:       string;
  brightnessNits:  number;
  interfaces:      Interface[];
}
