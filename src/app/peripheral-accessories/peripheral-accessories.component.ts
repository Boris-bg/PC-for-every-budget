import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { FilterConfig } from '../models/FilterConfig';
import { PeripheralAccessoryService } from '../services/peripheral-accessory.service';
import { PeripheralAccessory } from '../models/PeripheralAccessory';

@Component({
  selector: 'app-peripheral-accessories',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      [title]="title"
      [items]="items"
      [filterConfig]="filters"
      [preSelectedChips]="preSelected">
    </app-product-list>
  `
})
export class PeripheralAccessoriesComponent implements OnInit {
  items: PeripheralAccessory[] = [];
  title = 'Периферни аксесоари';
  preSelected: { field: string; values: (string | number)[] }[] = [];

  filters: FilterConfig[] = [
    { type: 'chips-string', label: 'Тип',          field: 'accessoryType' },
    { type: 'chips-string', label: 'Производител', field: 'brand', hideFromSpecs: true },
    { type: 'price-range',  label: 'Цена',         field: 'price' },
  ];

  constructor(
    private service: PeripheralAccessoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Прочети state от навигацията
    const state = this.router.getCurrentNavigation()?.extras.state
      ?? history.state;

    if (state?.preSelect?.length) {
      this.title = 'Аудио';
      this.preSelected = [
        { field: 'accessoryType', values: state.preSelect }
      ];
    }

    this.service.getAll().subscribe(data => this.items = data);
  }
}
