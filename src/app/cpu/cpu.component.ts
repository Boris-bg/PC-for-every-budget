import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { CpuService } from '../services/cpu.service';
import { CPU } from '../models/CPU';

@Component({
  selector: 'app-cpu',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Процесори"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class CpuComponent implements OnInit {

  items: CPU[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string',  label: 'Сокет',           field: 'socket' },
    { type: 'chips-number',  label: 'Ядра',             field: 'cores',         suffix: ' cores' },
    { type: 'chips-number',  label: 'Нишки',            field: 'threads',       suffix: ' threads' },
    { type: 'chips-number',  label: 'Честота',          field: 'frequencyGHz',  suffix: ' GHz' },
    { type: 'chips-number',  label: 'TDP',              field: 'tdpWatts',      suffix: ' W' },
    { type: 'chips-string',  label: 'Производител',     field: 'brand' },
    { type: 'chips-boolean', label: 'Интегрирана графика', field: 'integratedGraphicsModel' },
    { type: 'price-range',   label: 'Цена',             field: 'price' },
  ];

  constructor(private service: CpuService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }
}
