import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { PsuService } from '../services/psu.service';
import { PSU } from '../models/PSU';

@Component({
  selector: 'app-psu',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Захранвания"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class PsuComponent implements OnInit {
  items: PSU[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-number',  label: 'Мощност',       field: 'powerWatts', suffix: ' W' },
    { type: 'chips-string',  label: 'Форм фактор',   field: 'formFactor' },
    { type: 'chips-string',  label: 'Ефективност',   field: 'efficiency' },
    { type: 'chips-string',  label: 'Категория',     field: 'category' },
    { type: 'chips-string',  label: 'Кабели',        field: 'wiringType' },
    { type: 'chips-boolean', label: 'PFC',           field: 'hasPfc' },
    { type: 'chips-string',  label: 'Производител',  field: 'brand' },
    { type: 'price-range',   label: 'Цена',          field: 'price' },
  ];

  constructor(private service: PsuService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
