import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { RomService } from '../services/rom.service';
import { ROM } from '../models/ROM';

@Component({
  selector: 'app-rom',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Дискове"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class RomComponent implements OnInit {
  items: ROM[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Тип',           field: 'storageType' },
    { type: 'chips-number', label: 'Капацитет',     field: 'memorySizeGB',  suffix: ' GB' },
    { type: 'chips-string', label: 'Форм фактор',   field: 'formFactor' },
    { type: 'chips-string', label: 'Интерфейс',     field: 'interfaceType' },
    { type: 'chips-string', label: 'Производител',  field: 'brand' },
    { type: 'price-range',  label: 'Цена',          field: 'price' },
  ];

  constructor(private service: RomService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
