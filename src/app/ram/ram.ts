import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RAM} from '../models/RAM';
import {RamService} from '../services/ram.service';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ram.html',
  styleUrl: './ram.css'
})
export class Ram implements OnInit {

  private allRams: RAM[] = [];
  protected displayedRams: RAM[] = [];

  protected selectedSizes: number[] = [];
  protected selectedTypes: string[] = [];
  protected selectedSpeeds: number[] = [];
  protected selectedBrands: string[] = [];
  protected filterKit: boolean | null = null;
  protected filterRgb: boolean | null = null;

  protected minPrice: number = 0;
  protected maxPrice: number = 500;
  protected currentMinPrice: number = 0;
  protected currentMaxPrice: number = 500;

  protected availableSizes: number[] = [4, 8, 16, 32, 64];
  protected availableTypes: string[] = ['DDR3', 'DDR4', 'DDR5'];
  protected availableSpeeds: number[] = [];
  protected availableBrands: string[] = [];

  protected sortBy: string = 'rating';
  protected pageSize: number = 15;
  protected currentPage: number = 1;
  protected totalPages: number = 1;
  protected totalItems: number = 0;
  protected pages: number[] = [];
  protected quantities: Map<number, number> = new Map();

  constructor(private ramService: RamService) {
  }

  ngOnInit(): void {
    this.ramService.getAll().subscribe(data => {
      this.allRams = data;

      this.availableBrands = [...new Set(data.map(r => r.brand))].sort();
      this.availableSpeeds = [...new Set(data.map(r => r.speedMHz))].sort((a, b) => a - b);

      if (data.length) {
        this.minPrice = Math.floor(Math.min(...data.map(r => r.price)));
        this.maxPrice = Math.ceil(Math.max(...data.map(r => r.price)));
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
      }

      this.applyAll();
    });
  }

  protected toggleSize(size: number): void {
    this.toggle(this.selectedSizes, size);
    this.applyAll();
  }

  protected toggleType(type: string): void {
    this.toggle(this.selectedTypes, type);
    this.applyAll();
  }

  protected toggleSpeed(speed: number): void {
    this.toggle(this.selectedSpeeds, speed);
    this.applyAll();
  }

  protected toggleBrand(brand: string): void {
    this.toggle(this.selectedBrands, brand);
    this.applyAll();
  }

  protected toggleKit(): void {
    this.filterKit = this.filterKit === null ? true : this.filterKit === true ? false : null;
    this.applyAll();
  }

  protected toggleRgb(): void {
    this.filterRgb = this.filterRgb === null ? true : this.filterRgb === true ? false : null;
    this.applyAll();
  }

  protected onPriceChange(): void {
    // Clamp so min never exceeds max and vice versa
    if (this.currentMinPrice > this.currentMaxPrice) {
      this.currentMinPrice = this.currentMaxPrice;
    }
    if (this.currentMaxPrice < this.currentMinPrice) {
      this.currentMaxPrice = this.currentMinPrice;
    }
    this.currentPage = 1;
    this.applyAll();
  }

  protected onSortChange(): void {
    this.applyAll();
  }

  protected onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyAll();
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyAll();
  }

  protected getQty(id: number): number {
    return this.quantities.get(id) ?? 1;
  }

  protected changeQty(id: number, delta: number, max: number): void {
    const current = this.getQty(id);
    const next = current + delta;
    if (next < 1 || next > max) return;
    this.quantities.set(id, next);
  }

  protected clearFilters(): void {
    this.selectedSizes = [];
    this.selectedTypes = [];
    this.selectedSpeeds = [];
    this.selectedBrands = [];
    this.filterKit = null;
    this.filterRgb = null;
    this.currentMinPrice = this.minPrice;
    this.currentMaxPrice = this.maxPrice;
    this.currentPage = 1;
    this.applyAll();
  }

  get hasActiveFilters(): boolean {
    return this.selectedSizes.length > 0
      || this.selectedTypes.length > 0
      || this.selectedSpeeds.length > 0
      || this.selectedBrands.length > 0
      || this.filterKit !== null
      || this.filterRgb !== null
      || this.currentMinPrice > this.minPrice
      || this.currentMaxPrice < this.maxPrice;
  }

  private applyAll(): void {
    let result = [...this.allRams];

    if (this.selectedSizes.length)
      result = result.filter(r => this.selectedSizes.includes(r.memorySizeGB));
    if (this.selectedTypes.length)
      result = result.filter(r => this.selectedTypes.includes(r.type));
    if (this.selectedSpeeds.length)
      result = result.filter(r => this.selectedSpeeds.includes(r.speedMHz));
    if (this.selectedBrands.length)
      result = result.filter(r => this.selectedBrands.includes(r.brand));
    if (this.filterKit !== null)
      result = result.filter(r => r.isKIT === this.filterKit);
    if (this.filterRgb !== null)
      result = result.filter(r => r.isRGB === this.filterRgb);

    result = result.filter(r => r.price >= this.currentMinPrice && r.price <= this.currentMaxPrice);

    result = this.sortRams(result);

    this.totalItems = result.length;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedRams = result.slice(start, start + this.pageSize);
  }

  private sortRams(rams: RAM[]): RAM[] {
    return [...rams].sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name, 'bg');
        default:
          return 0;
      }
    });
  }

  private toggle<T>(arr: T[], val: T): void {
    const i = arr.indexOf(val);
    i >= 0 ? arr.splice(i, 1) : arr.push(val);
  }

  protected isSelected<T>(arr: T[], val: T): boolean {
    return arr.includes(val);
  }
}
