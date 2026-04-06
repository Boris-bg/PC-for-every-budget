import { Product } from './Product';

export interface PeripheralAccessory extends Product {
  accessoryType: string;  // 'Headset', 'Mousepad', 'Webcam', 'Microphone', 'Speaker'
}
