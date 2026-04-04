import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { BoxService } from '../services/box.service';
import { Box } from '../models/Box';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Компютърни кутии"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class BoxComponent implements OnInit {

  items: Box[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Форм фактор',    field: 'boxFormFactor' },
    { type: 'chips-string', label: 'Дънна платка',   field: 'motherboardFormFactor' },
    { type: 'chips-string', label: 'Цвят',           field: 'color' },
    { type: 'chips-string', label: 'PSU тип',        field: 'psuType' },
    { type: 'chips-string', label: 'Производител',   field: 'brand' },
    { type: 'price-range',  label: 'Цена',           field: 'price' },
  ];

  constructor(private service: BoxService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }
}
