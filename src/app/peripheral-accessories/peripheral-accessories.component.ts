import {Component, OnInit} from '@angular/core';
import {ProductListComponent} from '../shared/product-list/product-list.component';
import {FilterConfig} from '../models/FilterConfig';
import {PeripheralAccessoryService} from '../services/peripheral-accessory.service';
import {PeripheralAccessory} from '../models/PeripheralAccessory';

@Component({
  selector: 'app-peripheral-accessories',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Периферни аксесоари"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class PeripheralAccessoriesComponent implements OnInit {
  items: PeripheralAccessory[] = [];

  filters: FilterConfig[] = [
    {type: 'chips-string', label: 'Тип', field: 'accessoryType'},
    {type: 'chips-string', label: 'Производител', field: 'brand', hideFromSpecs: true},
    {type: 'price-range', label: 'Цена', field: 'price'},
  ];

  constructor(private service: PeripheralAccessoryService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }
}
