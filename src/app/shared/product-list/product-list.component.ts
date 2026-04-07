import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product';
import { FilterConfig } from '../../models/FilterConfig';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl:    './product-list.component.css'
})
export class ProductListComponent implements OnChanges {

  @Input() title: string = '';
  @Input() items: Product[] = [];
  @Input() filterConfig: FilterConfig[] = [];
  @Input() preSelectedChips: { field: string; values: (string | number)[] }[] = [];

  // ── Displayed after filter+sort+page ──────────────
  protected displayedItems: Product[] = [];
  protected quantities: Map<number, number> = new Map();

  // ── Active filter values ───────────────────────────
  // chips-string / chips-number: field → selected values[]
  protected activeChips: Map<string, (string | number)[]> = new Map();
  // chips-boolean: field → null | true | false
  protected activeBooleans: Map<string, boolean | null> = new Map();
  // price-range
  protected minPrice        = 0;
  protected maxPrice        = 500;
  protected currentMinPrice = 0;
  protected currentMaxPrice = 500;

  // ── Dynamic options built from data ───────────────
  protected dynamicOptions: Map<string, (string | number)[]> = new Map();

  // ── Sort & pagination ──────────────────────────────
  protected sortBy      = 'rating';
  protected pageSize    = 15;
  protected currentPage = 1;
  protected totalPages  = 1;
  protected totalItems  = 0;
  protected pages:        number[] = [];

  // Re-run whenever parent pushes new items
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length) {
      this.buildDynamicOptions();
      this.buildPriceRange();

      // Apply pre-selected chips
      for (const pre of this.preSelectedChips) {
        this.activeChips.set(pre.field, [...pre.values]);
      }

      this.applyAll();
    }
  }

  // ── Build dynamic options from data ───────────────
  private buildDynamicOptions(): void {
    for (const cfg of this.filterConfig) {
      if (cfg.type === 'price-range') continue;
      if (cfg.options) {
        this.dynamicOptions.set(cfg.field, cfg.options);
      } else {
        // Extract unique values from items
        const vals = [...new Set(
          this.items
            .map(item => this.getFieldValue(item, cfg.field))
            .filter(v => v !== null && v !== undefined)
        )].sort((a, b) =>
          typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
        );
        this.dynamicOptions.set(cfg.field, vals);
      }

      // Init active state if not set
      if (cfg.type === 'chips-boolean') {
        if (!this.activeBooleans.has(cfg.field))
          this.activeBooleans.set(cfg.field, null);
      } else {
        if (!this.activeChips.has(cfg.field))
          this.activeChips.set(cfg.field, []);
      }
    }
  }

  private buildPriceRange(): void {
    const prices = this.items.map(i => i.price);
    this.minPrice = Math.floor(Math.min(...prices));
    this.maxPrice = Math.ceil(Math.max(...prices));
    this.currentMinPrice = this.minPrice;
    this.currentMaxPrice = this.maxPrice;
  }

  private getFieldValue(item: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }

  // ── Toggle helpers ─────────────────────────────────
  protected toggleChip(field: string, value: string | number): void {
    const arr = this.activeChips.get(field) ?? [];
    const i   = arr.indexOf(value);
    i >= 0 ? arr.splice(i, 1) : arr.push(value);
    this.activeChips.set(field, arr);
    this.applyAll();
  }

  protected toggleBoolean(field: string): void {
    const cur = this.activeBooleans.get(field) ?? null;
    const next = cur === null ? true : cur ? false : null;
    this.activeBooleans.set(field, next);
    this.applyAll();
  }

  protected isChipSelected(field: string, value: string | number): boolean {
    return (this.activeChips.get(field) ?? []).includes(value);
  }

  protected getBooleanState(field: string): boolean | null {
    return this.activeBooleans.get(field) ?? null;
  }

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
    this.activeChips.forEach((_, key) => this.activeChips.set(key, []));
    this.activeBooleans.forEach((_, key) => this.activeBooleans.set(key, null));
    this.currentMinPrice = this.minPrice;
    this.currentMaxPrice = this.maxPrice;
    this.currentPage = 1;
    this.applyAll();
  }

  get hasActiveFilters(): boolean {
    const hasChip     = [...this.activeChips.values()].some(arr => arr.length > 0);
    const hasBool     = [...this.activeBooleans.values()].some(v => v !== null);
    const hasPrice    = this.currentMinPrice > this.minPrice || this.currentMaxPrice < this.maxPrice;
    return hasChip || hasBool || hasPrice;
  }

  // ── Core: filter → sort → paginate ────────────────
  private applyAll(): void {
    let result = [...this.items];

    // Apply chip filters
    this.activeChips.forEach((selected, field) => {
      if (selected.length)
        result = result.filter(item => selected.includes(this.getFieldValue(item, field)));
    });

    // Apply boolean filters
    this.activeBooleans.forEach((value, field) => {
      if (value !== null)
        result = result.filter(item => this.getFieldValue(item, field) === value);
    });

    // Apply price filter
    result = result.filter(i =>
      i.price >= this.currentMinPrice && i.price <= this.currentMaxPrice
    );

    // Sort
    result = result.sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':     return b.rating - a.rating;
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name':       return a.name.localeCompare(b.name, 'bg');
        default:           return 0;
      }
    });

    // Paginate
    this.totalItems = result.length;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start       = (this.currentPage - 1) * this.pageSize;
    this.displayedItems = result.slice(start, start + this.pageSize);
  }

  // ── Quantity helpers ───────────────────────────────
  protected getQty(id: number): number {
    return this.quantities.get(id) ?? 1;
  }

  protected changeQty(id: number, delta: number, max: number): void {
    const next = (this.quantities.get(id) ?? 1) + delta;
    if (next < 1 || next > max) return;
    this.quantities.set(id, next);
  }

  // ── Specs to show on card ──────────────────────────
  // Shows values of all chip-type filters as spec pills
  protected getSpecs(item: Product): string[] {
    const specs: string[] = [];
    for (const cfg of this.filterConfig) {
      if (cfg.type === 'price-range') continue;
      if (cfg.hideFromSpecs) continue;
      const val = this.getFieldValue(item, cfg.field);
      if (val === null || val === undefined) continue;
      if (cfg.type === 'chips-boolean') {
        if (val === true) specs.push(cfg.label);
      } else if (Array.isArray(val)) {
        // За масиви (interfaces) — покажи имената разделени със запетая
        specs.push(val.map((v: any) => v.name ?? v).join(', '));
      } else {
        specs.push(`${val}${cfg.suffix ?? ''}`);
      }
    }
    return specs;
  }
}
