import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { MonitorService } from '../services/monitor.service';
import { Monitor } from '../models/Monitor';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Монитори"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class MonitorComponent implements OnInit {
  items: Monitor[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-number',  label: 'Размер',           field: 'panelSizeInch',  suffix: '"' },
    { type: 'chips-string',  label: 'Резолюция',        field: 'resolution' },
    { type: 'chips-number',  label: 'Честота',          field: 'refreshRateHz',  suffix: ' Hz' },
    { type: 'chips-string',  label: 'Тип панел',        field: 'panelType' },
    { type: 'chips-string',  label: 'Съотношение',      field: 'aspectRatio' },
    { type: 'chips-string',  label: 'Производител',     field: 'brand', hideFromSpecs: true },
    { type: 'price-range',   label: 'Цена',             field: 'price' },
  ];

  constructor(private service: MonitorService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
