import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { MouseService } from '../services/mouse.service';
import { Mouse } from '../models/Mouse';

@Component({
  selector: 'app-mouse',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Мишки"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class MouseComponent implements OnInit {
  items: Mouse[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string',  label: 'Тип връзка',       field: 'interfaceType.name' },
    { type: 'chips-string',  label: 'Свързване',        field: 'connectionType' },
    { type: 'chips-number',  label: 'Макс. DPI',        field: 'maxDpi', suffix: ' DPI' },
    { type: 'chips-string',  label: 'Цвят',             field: 'color' },
    { type: 'chips-boolean', label: 'За лява ръка',     field: 'suitableForLeftHand' },
    { type: 'chips-string',  label: 'Производител',     field: 'brand', hideFromSpecs: true },
    { type: 'price-range',   label: 'Цена',             field: 'price' },
  ];

  constructor(private service: MouseService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
