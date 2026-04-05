import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { CoolerService } from '../services/cooler.service';
import { Cooler } from '../models/Cooler';

@Component({
  selector: 'app-cooler',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Охлаждане"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class CoolerComponent implements OnInit {
  items: Cooler[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Тип охлаждане',    field: 'coolingType' },
    { type: 'chips-string', label: 'Сокет',             field: 'socket.name' },
    { type: 'chips-number', label: 'Размер вентилатор', field: 'fanWidthMM', suffix: ' mm' },
    { type: 'chips-string', label: 'Производител',      field: 'brand' },
    { type: 'price-range',  label: 'Цена',              field: 'price' },
  ];

  constructor(private service: CoolerService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
