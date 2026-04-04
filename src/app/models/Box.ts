import { Product } from './Product';

export interface Box extends Product {
  motherboardFormFactor: string;  // ATX, mATX, ITX
  boxFormFactor: string;          // Mid Tower, Full Tower, Mini Tower
  color: string;
  maxGPULengthMM: number;
  maxCPUCoolerHeightMM: number;
  psuType: string;                // ATX, SFX
}
