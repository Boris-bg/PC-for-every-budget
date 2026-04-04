import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Box } from '../models/Box';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent implements OnInit {

  private allItems: Box[] = [];
  protected displayedItems: Box[] = [];
  protected quantities: Map<number, number> = new Map();

  // ── Filters ───────────────────────────────────────
  protected selectedFormFactors:      string[] = [];
  protected selectedMBFormFactors:    string[] = [];
  protected selectedColors:           string[] = [];
  protected selectedBrands:           string[] = [];
  protected selectedPsuTypes:         string[] = [];

  protected minPrice:        number = 0;
  protected maxPrice:        number = 500;
  protected currentMinPrice: number = 0;
  protected currentMaxPrice: number = 500;

  // ── Filter options (built from data) ─────────────
  protected availableFormFactors:   string[] = [];
  protected availableMBFormFactors: string[] = [];
  protected availableColors:        string[] = [];
  protected availableBrands:        string[] = [];
  protected availablePsuTypes:      string[] = [];

  // ── Sort & pagination ─────────────────────────────
  protected sortBy:      string = 'rating';
  protected pageSize:    number = 15;
  protected currentPage: number = 1;
  protected totalPages:  number = 1;
  protected totalItems:  number = 0;
  protected pages:       number[] = [];

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.getAll().subscribe(data => {
      this.allItems = data;

      // Build filter options from actual data
      this.availableFormFactors   = [...new Set(data.map(b => b.boxFormFactor))].sort();
      this.availableMBFormFactors = [...new Set(data.map(b => b.motherboardFormFactor))].sort();
      this.availableColors        = [...new Set(data.map(b => b.color))].sort();
      this.availableBrands        = [...new Set(data.map(b => b.brand))].sort();
      this.availablePsuTypes      = [...new Set(data.map(b => b.psuType))].sort();

      if (data.length) {
        this.minPrice        = Math.floor(Math.min(...data.map(b => b.price)));
        this.maxPrice        = Math.ceil(Math.max(...data.map(b => b.price)));
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
      }

      this.applyAll();
    });
  }

  // ── Toggle helpers ────────────────────────────────
  protected toggleFormFactor(v: string):   void { this.toggle(this.selectedFormFactors, v);   this.applyAll(); }
  protected toggleMBFormFactor(v: string): void { this.toggle(this.selectedMBFormFactors, v); this.applyAll(); }
  protected toggleColor(v: string):        void { this.toggle(this.selectedColors, v);        this.applyAll(); }
  protected toggleBrand(v: string):        void { this.toggle(this.selectedBrands, v);        this.applyAll(); }
  protected togglePsuType(v: string):      void { this.toggle(this.selectedPsuTypes, v);      this.applyAll(); }

  protected onPriceChange(): void {
    if (this.currentMinPrice > this.currentMaxPrice)
      this.currentMinPrice = this.currentMaxPrice;
    if (this.currentMaxPrice < this.currentMinPrice)
      this.currentMaxPrice = this.currentMinPrice;
    this.currentPage = 1;
    this.applyAll();
  }

  protected onSortChange():     void { this.applyAll(); }
  protected onPageSizeChange(): void { this.currentPage = 1; this.applyAll(); }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyAll();
  }

  protected clearFilters(): void {
    this.selectedFormFactors   = [];
    this.selectedMBFormFactors = [];
    this.selectedColors        = [];
    this.selectedBrands        = [];
    this.selectedPsuTypes      = [];
    this.currentMinPrice       = this.minPrice;
    this.currentMaxPrice       = this.maxPrice;
    this.currentPage           = 1;
    this.applyAll();
  }

  get hasActiveFilters(): boolean {
    return this.selectedFormFactors.length > 0
      || this.selectedMBFormFactors.length > 0
      || this.selectedColors.length > 0
      || this.selectedBrands.length > 0
      || this.selectedPsuTypes.length > 0
      || this.currentMinPrice > this.minPrice
      || this.currentMaxPrice < this.maxPrice;
  }

  // ── Core: filter → sort → paginate ───────────────
  private applyAll(): void {
    let result = [...this.allItems];

    if (this.selectedFormFactors.length)
      result = result.filter(b => this.selectedFormFactors.includes(b.boxFormFactor));
    if (this.selectedMBFormFactors.length)
      result = result.filter(b => this.selectedMBFormFactors.includes(b.motherboardFormFactor));
    if (this.selectedColors.length)
      result = result.filter(b => this.selectedColors.includes(b.color));
    if (this.selectedBrands.length)
      result = result.filter(b => this.selectedBrands.includes(b.brand));
    if (this.selectedPsuTypes.length)
      result = result.filter(b => this.selectedPsuTypes.includes(b.psuType));

    result = result.filter(b =>
      b.price >= this.currentMinPrice && b.price <= this.currentMaxPrice
    );

    result = result.sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':     return b.rating - a.rating;
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name':       return a.name.localeCompare(b.name, 'bg');
        default:           return 0;
      }
    });

    this.totalItems = result.length;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedItems = result.slice(start, start + this.pageSize);
  }

  private toggle<T>(arr: T[], val: T): void {
    const i = arr.indexOf(val);
    i >= 0 ? arr.splice(i, 1) : arr.push(val);
  }

  protected isSelected<T>(arr: T[], val: T): boolean {
    return arr.includes(val);
  }

  protected getQty(id: number): number {
    return this.quantities.get(id) ?? 1;
  }

  protected changeQty(id: number, delta: number, max: number): void {
    const next = (this.quantities.get(id) ?? 1) + delta;
    if (next < 1 || next > max) return;
    this.quantities.set(id, next);
  }

  protected colorHex(color: string): string {
    const map: Record<string, string> = {
      'Black': '#1a1a1a',
      'White': '#f0f0f0',
      'Red':   '#ef4444',
      'Blue':  '#3b82f6',
      'Green': '#22c55e',
    };
    return map[color] ?? '#9aa6b2';
  }
}
