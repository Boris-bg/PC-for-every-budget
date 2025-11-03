import { Component } from '@angular/core';
import {RAM} from '../models/RAM';

@Component({
  selector: 'app-ram',
  imports: [],
  templateUrl: './ram.html',
  styleUrl: './ram.css'
})
export class Ram {
  protected rams: RAM[] = [
    {
      id: 1,
      name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3200',
      price: 79.99,
      brand: 'Corsair',
      warrantyPeriod: 60,
      availability: 25,
      additionalDetails: 'Low profile design for better compatibility with large CPU coolers.',
      rating: 4.5,
      imageUrl: '',
      imageAltText: 'Corsair Vengeance LPX RAM modules',
      memorySizeGB: 16,
      type: 'DDR4',
      speedMHz: 3200,
      isKIT: true,
      isRGB: false
    },
    {
      id: 2,
      name: 'G.Skill Trident Z RGB 32GB (2 x 16GB) DDR4-3600',
      price: 159.99,
      brand: 'G.Skill',
      warrantyPeriod: 60,
      availability: 15,
      additionalDetails: 'Vibrant RGB lighting with customizable effects.',
      rating: 4.8,
      imageUrl: '',
      imageAltText: 'G.Skill Trident Z RGB RAM modules',
      memorySizeGB: 32,
      type: 'DDR4',
      speedMHz: 3600,
      isKIT: true,
      isRGB: true
    },
    {
      id: 3,
      name: 'Kingston HyperX Fury 8GB DDR4-2400',
      price: 39.99,
      brand: 'Kingston',
      warrantyPeriod: 36,
      availability: 40,
      additionalDetails: 'Affordable performance for everyday computing needs.',
      rating: 4.2,
      imageUrl: '',
      imageAltText: 'Kingston HyperX Fury RAM module',
      memorySizeGB: 8,
      type: 'DDR4',
      speedMHz: 2400,
      isKIT: false,
      isRGB: false
    }
  ];
}
