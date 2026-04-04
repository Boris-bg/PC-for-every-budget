import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { RamService } from '../services/ram.service';
import { RAM } from '../models/RAM';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Оперативна памет"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class RamComponent implements OnInit {

  items: RAM[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-number', label: 'Обем',        field: 'memorySizeGB', suffix: ' GB' },
    { type: 'chips-string', label: 'Тип',          field: 'type' },
    { type: 'chips-number', label: 'Честота',      field: 'speedMHz',    suffix: ' MHz' },
    { type: 'chips-string', label: 'Производител', field: 'brand' },
    { type: 'chips-boolean',label: 'KIT',          field: 'isKIT' },
    { type: 'chips-boolean',label: 'RGB',          field: 'isRGB' },
    { type: 'price-range',  label: 'Цена',         field: 'price' },
  ];

  constructor(private service: RamService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }
}
