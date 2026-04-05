import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { AccessoryService } from '../services/accessory.service';
import { Accessory } from '../models/Accessory';

@Component({
  selector: 'app-accessory',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Аксесоари"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class AccessoryComponent implements OnInit {
  items: Accessory[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Тип',              field: 'accessoryType' },
    { type: 'chips-number', label: 'Размер вентилатор', field: 'fanWidthMM', suffix: ' mm' },
    { type: 'chips-string', label: 'Производител',     field: 'brand' },
    { type: 'price-range',  label: 'Цена',             field: 'price' },
  ];

  constructor(private service: AccessoryService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
