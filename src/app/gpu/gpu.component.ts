import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { GpuService } from '../services/gpu.service';
import { GPU } from '../models/GPU';

@Component({
  selector: 'app-gpu',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Видеокарти"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class GpuComponent implements OnInit {
  items: GPU[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string',  label: 'Производител чип', field: 'chipBrand' },
    { type: 'chips-number',  label: 'Памет',             field: 'memorySizeGB',  suffix: ' GB' },
    { type: 'chips-string',  label: 'Тип памет',         field: 'memoryType' },
    { type: 'chips-number',  label: 'Слотове',           field: 'slotWidth',     suffix: ' slot' },
    { type: 'chips-string',  label: 'DirectX',           field: 'directXVersion' },
    { type: 'chips-string',  label: 'Производител',      field: 'brand' },
    { type: 'price-range',   label: 'Цена',              field: 'price' },
  ];

  constructor(private service: GpuService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
