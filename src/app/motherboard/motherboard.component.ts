import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { MotherboardService } from '../services/motherboard.service';
import { Motherboard } from '../models/Motherboard';

@Component({
  selector: 'app-motherboard',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Дънни платки"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class MotherboardComponent implements OnInit {
  items: Motherboard[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string',  label: 'Сокет',        field: 'socket.name' },
    { type: 'chips-string',  label: 'Чипсет',       field: 'chipset' },
    { type: 'chips-string',  label: 'Тип RAM',      field: 'supportedRamType' },
    { type: 'chips-number',  label: 'RAM слотове',  field: 'ramSlots',   suffix: ' бр.' },
    { type: 'chips-string',  label: 'Форм фактор',  field: 'formFactor' },
    { type: 'chips-boolean', label: 'Wi-Fi',        field: 'hasBuiltInWifi' },
    { type: 'chips-boolean', label: 'Bluetooth',    field: 'hasBuiltInBluetooth' },
    { type: 'chips-string',  label: 'Производител', field: 'brand' },
    { type: 'price-range',   label: 'Цена',         field: 'price' },
  ];

  constructor(private service: MotherboardService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
