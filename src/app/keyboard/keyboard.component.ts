import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { KeyboardService } from '../services/keyboard.service';
import { Keyboard } from '../models/Keyboard';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Клавиатури"
      [items]="items"
      [filterConfig]="filters">
    </app-product-list>
  `
})
export class KeyboardComponent implements OnInit {
  items: Keyboard[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string',  label: 'Тип връзка',      field: 'interfaceType.name' },
    { type: 'chips-string',  label: 'Свързване',       field: 'connectionType' },
    { type: 'chips-string',  label: 'Тип клавиатура',  field: 'keyboardType' },
    { type: 'chips-string',  label: 'Суичове',         field: 'switches' },
    { type: 'chips-string',  label: 'Цвят',            field: 'color' },
    { type: 'chips-boolean', label: 'BG подредба',     field: 'hasBulgarianLayout' },
    { type: 'chips-boolean', label: 'RGB осветление',  field: 'hasLighting' },
    { type: 'chips-string',  label: 'Производител',    field: 'brand', hideFromSpecs: true },
    { type: 'price-range',   label: 'Цена',            field: 'price' },
  ];

  constructor(private service: KeyboardService) {}
  ngOnInit(): void { this.service.getAll().subscribe(data => this.items = data); }
}
