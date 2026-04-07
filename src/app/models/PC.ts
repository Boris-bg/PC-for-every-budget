import {Product} from './Product';
import {CPU} from './CPU';
import {Cooler} from './Cooler';
import {Motherboard} from './Motherboard';
import {RAM} from './RAM';
import {ROM} from './ROM';
import {GPU} from './GPU';
import {PSU} from './PSU';
import {OS} from './OS';
import {Box} from './Box';

export interface PC extends Product {
  cpu: CPU;
  cooler: Cooler;
  motherboard: Motherboard;
  ram: RAM;
  rom: ROM;
  rom2?: ROM;
  gpu?: GPU;
  psu: PSU;
  os?: OS;
  box: Box;
  comment?: string;
}
