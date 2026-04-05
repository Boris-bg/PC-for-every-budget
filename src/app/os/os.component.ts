import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { OsService } from '../services/os.service';
import { OS } from '../models/OS';

@Component({
  selector: 'app-os',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Операционни системи"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class OsComponent implements OnInit {
  items: OS[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Тип',          field: 'osType' },
    { type: 'chips-string', label: 'Производител', field: 'brand' },
    { type: 'price-range',  label: 'Цена',         field: 'price' },
  ];

  constructor(private service: OsService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
