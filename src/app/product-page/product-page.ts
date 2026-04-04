import { Component } from '@angular/core';
import { Directive, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

// ── Base class ─────────────────────────────────────────────────
@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
@Directive()
export abstract class ProductPage<T extends Product> implements OnInit {
  // ── Data ──────────────────────────────────────────
  private _all: T[] = [];
  displayedItems: T[] = [];
  quantities: Map<number, number> = new Map();

  // ── Price ──────────────────────────────────────────
  minPrice        = 0;
  maxPrice        = 999;
  currentMinPrice = 0;
  currentMaxPrice = 999;

  // ── Sort & page ────────────────────────────────────
  sortBy      = 'rating';
  pageSize    = 15;
  currentPage = 1;
  totalPages  = 1;
  totalItems  = 0;
  pages: number[] = [];

  // ── Abstract — each subclass must implement ────────

  /** Page title shown in <h1> */
  abstract get pageTitle(): string;

  /** Calls the backend service */
  abstract fetchAll(): Observable<T[]>;

  /** Called once after data loads — build chip options from data */
  abstract buildFilters(data: T[]): void;

  /** Returns the list of chip filter groups to render */
  abstract get chipFilters(): ChipFilter[];

  /** Returns the list of boolean toggle filters (KIT, RGB…) */
  get toggleFilters(): ToggleFilter[] { return []; }

  /** Returns spec pills for a single product card */
  abstract getSpecs(item: T): string[];

  /** Whether the item passes all active filters */
  abstract matchesFilters(item: T): boolean;

  // ── Lifecycle ──────────────────────────────────────

  ngOnInit(): void {
    this.fetchAll().subscribe(data => {
      this._all = data;

      if (data.length) {
        this.minPrice        = Math.floor(Math.min(...data.map(p => p.price)));
        this.maxPrice        = Math.ceil(Math.max(...data.map(p => p.price)));
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
      }

      this.buildFilters(data);
      this.applyAll();
    });
  }

  // ── Sort / page / price events ─────────────────────

  onSortChange():     void { this.applyAll(); }
  onPageSizeChange(): void { this.currentPage = 1; this.applyAll(); }

  onPriceChange(): void {
    if (this.currentMinPrice > this.currentMaxPrice)
      this.currentMinPrice = this.currentMaxPrice;
    if (this.currentMaxPrice < this.currentMinPrice)
      this.currentMaxPrice = this.currentMinPrice;
    this.currentPage = 1;
    this.applyAll();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyAll();
  }

  // ── Quantity helpers ───────────────────────────────

  getQty(id: number): number {
    return this.quantities.get(id) ?? 1;
  }

  changeQty(id: number, delta: number, max: number): void {
    const next = (this.quantities.get(id) ?? 1) + delta;
    if (next < 1 || next > max) return;
    this.quantities.set(id, next);
  }

  // ── hasActiveFilters ───────────────────────────────

  get hasActiveFilters(): boolean {
    const chipsActive = this.chipFilters.some(f => f.selected.length > 0);
    const togglesActive = this.toggleFilters.some(f => f.state !== null);
    const priceActive = this.currentMinPrice > this.minPrice
      || this.currentMaxPrice < this.maxPrice;
    return chipsActive || togglesActive || priceActive;
  }

  clearFilters(): void {
    this.chipFilters.forEach(f => f.selected.splice(0));
    this.toggleFilters.forEach(f => f.state = null);
    this.currentMinPrice = this.minPrice;
    this.currentMaxPrice = this.maxPrice;
    this.currentPage     = 1;
    this.applyAll();
  }

  // ── Core pipeline ──────────────────────────────────

  private applyAll(): void {
    let result = this._all.filter(item =>
      item.price >= this.currentMinPrice &&
      item.price <= this.currentMaxPrice &&
      this.matchesFilters(item)
    );

    result = result.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name':       return a.name.localeCompare(b.name, 'bg');
        default:           return b.rating - a.rating;  // 'rating' default
      }
    });

    this.totalItems = result.length;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedItems = result.slice(start, start + this.pageSize);
  }

  // ── Shared toggle helper ───────────────────────────

  protected toggle<V>(arr: V[], val: V): void {
    const i = arr.indexOf(val);
    i >= 0 ? arr.splice(i, 1) : arr.push(val);
    this.applyAll();
  }

  protected isIn<V>(arr: V[], val: V): boolean {
    return arr.includes(val);
  }
}

// ── Filter config types ────────────────────────────────────────

export interface ChipFilter<T = string> {
  label: string;           // shown above chips e.g. "Обем"
  options: T[];            // chip values
  selected: T[];           // currently selected
  toggle: (v: T) => void;  // what happens on click
  isSelected: (v: T) => boolean;
  display?: (v: T) => string; // optional custom label e.g. "16 GB"
}

export interface ToggleFilter {
  label: string;           // e.g. "KIT"
  state: boolean | null;   // null=all, true=only, false=exclude
  toggle: () => void;
}

export interface ProductSpec {
  label: string;           // shown in spec pill
}
