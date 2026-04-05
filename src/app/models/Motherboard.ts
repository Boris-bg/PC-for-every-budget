import { Product } from './Product';
import { Socket } from './Socket';
import { Interface } from './Interface';

export interface Motherboard extends Product {
  socket:              Socket;
  chipset:             string;
  supportedRamType:    string;
  ramSlots:            number;
  formFactor:          string;
  hasBuiltInWifi:      boolean;
  hasBuiltInBluetooth: boolean;
  interfaces:          Interface[];
  ports:               string;
}
