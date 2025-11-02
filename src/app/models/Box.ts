import {Product} from './Product';

export interface Box extends Product {
  motherboardFormFactor: string;
  boxFormFactor: string;
  color: string;

  // TODO think about keeping them or not
  maxGPULengthMM: number;
  maxCPUCoolerHeightMM: number;
  psuType: string;
}
