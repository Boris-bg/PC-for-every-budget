import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RAM } from '../models/RAM';
import { RamService } from '../services/ram.service';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ram.html',
  styleUrl: './ram.css'
})
export class Ram implements OnInit {

  // ── All data from API ──────────────────────────────
  private allRams: RAM[] = [];

  // ── Displayed (after filter+sort+page) ────────────
  protected displayedRams: RAM[] = [];

  // ── Filter state ──────────────────────────────────
  protected selectedSizes: number[]   = [];
  protected selectedTypes: string[]   = [];
  protected selectedSpeeds: number[]  = [];
  protected selectedBrands: string[]  = [];
  protected filterKit: boolean | null = null;
  protected filterRgb: boolean | null = null;
  protected maxPrice: number          = 500;
  protected currentMaxPrice: number   = 500;

  // ── Available filter options (built from data) ─────
  protected availableSizes:  number[] = [4, 8, 16, 32, 64];
  protected availableTypes:  string[] = ['DDR3', 'DDR4', 'DDR5'];
  protected availableSpeeds: number[] = [2400, 3200, 3600, 4800, 6000];
  protected availableBrands: string[] = [];

  // ── Sort state ────────────────────────────────────
  protected sortBy: string = 'rating';

  // ── Pagination state ──────────────────────────────
  protected pageSize:    number = 15;
  protected currentPage: number = 1;
  protected totalPages:  number = 1;
  protected pages:       number[] = [];

  constructor(private ramService: RamService) {}

  ngOnInit(): void {
    this.ramService.getAll().subscribe(data => {
      this.allRams = data;

      // Build brand list dynamically from data
      this.availableBrands = [...new Set(data.map(r => r.brand))].sort();

      // Set max price from actual data
      this.maxPrice = Math.ceil(Math.max(...data.map(r => r.price)));
      this.currentMaxPrice = this.maxPrice;

      this.applyAll();
    });
  }

  // ── Toggle helpers ─────────────────────────────────

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
    // null = no filter, true = only kit, false = only non-kit
    this.filterKit = this.filterKit === null ? true : this.filterKit ? false : null;
    this.applyAll();
  }

  protected toggleRgb(): void {
    this.filterRgb = this.filterRgb === null ? true : this.filterRgb ? false : null;
    this.applyAll();
  }

  protected onPriceChange(): void {
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

  // ── Core: filter → sort → paginate ────────────────

  private applyAll(): void {
    let result = [...this.allRams];

    // Filter
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

    result = result.filter(r => r.price <= this.currentMaxPrice);

    // Sort
    result = this.sortRams(result);

    // Paginate
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedRams = result.slice(start, start + this.pageSize);
  }

  private sortRams(rams: RAM[]): RAM[] {
    return [...rams].sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':     return b.rating - a.rating;
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name':       return a.name.localeCompare(b.name);
        default:           return 0;
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
