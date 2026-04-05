import { Product } from './Product';
import { Interface } from './Interface';

export interface Keyboard extends Product {
  interfaceType:      Interface;
  connectionType:     string;
  hasBulgarianLayout: boolean;
  keyboardType:       string;
  color:              string;
  switches:           string;
  hasLighting:        boolean;
}
