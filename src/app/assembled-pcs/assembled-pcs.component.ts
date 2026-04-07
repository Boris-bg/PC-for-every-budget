import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PC } from '../models/PC';
import { PcService } from '../services/pc.service';

@Component({
  selector: 'app-assembled-pcs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assembled-pcs.component.html',
  styleUrl: './assembled-pcs.component.css'
})
export class AssembledPcsComponent implements OnInit {

  private allPcs: PC[] = [];
  protected displayedPcs: PC[] = [];

  // ── Filters ───────────────────────────────────────
  protected selectedSockets:  string[] = [];
  protected selectedRamTypes: string[] = [];
  protected selectedHasGpu:   boolean | null = null;
  protected selectedHasOs:    boolean | null = null;

  protected minPrice        = 0;
  protected maxPrice        = 5000;
  protected currentMinPrice = 0;
  protected currentMaxPrice = 5000;

  protected availableSockets:  string[] = [];
  protected availableRamTypes: string[] = [];

  // ── Sort & pagination ─────────────────────────────
  protected sortBy      = 'rating';
  protected pageSize    = 6;
  protected currentPage = 1;
  protected totalPages  = 1;
  protected totalItems  = 0;
  protected pages:        number[] = [];
  protected quantities:   Map<number, number> = new Map();

  constructor(private service: PcService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.allPcs = data;

      this.availableSockets  = [...new Set(data.map(p => p.cpu.socket.name))].sort();
      this.availableRamTypes = [...new Set(data.map(p => p.ram.type))].sort();

      this.minPrice        = Math.floor(Math.min(...data.map(p => p.price)));
      this.maxPrice        = Math.ceil(Math.max(...data.map(p => p.price)));
      this.currentMinPrice = this.minPrice;
      this.currentMaxPrice = this.maxPrice;

      this.applyAll();
    });
  }

  protected toggleSocket(s: string):  void { this.toggle(this.selectedSockets, s);  this.applyAll(); }
  protected toggleRamType(t: string): void { this.toggle(this.selectedRamTypes, t); this.applyAll(); }

  protected toggleHasGpu(): void {
    this.selectedHasGpu = this.selectedHasGpu === null ? true : this.selectedHasGpu === true ? false : null;
    this.applyAll();
  }

  protected toggleHasOs(): void {
    this.selectedHasOs = this.selectedHasOs === null ? true : this.selectedHasOs === true ? false : null;
    this.applyAll();
  }

  protected onPriceChange(): void {
    if (this.currentMinPrice > this.currentMaxPrice) this.currentMinPrice = this.currentMaxPrice;
    if (this.currentMaxPrice < this.currentMinPrice) this.currentMaxPrice = this.currentMinPrice;
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
    this.selectedSockets  = [];
    this.selectedRamTypes = [];
    this.selectedHasGpu   = null;
    this.selectedHasOs    = null;
    this.currentMinPrice  = this.minPrice;
    this.currentMaxPrice  = this.maxPrice;
    this.currentPage      = 1;
    this.applyAll();
  }

  get hasActiveFilters(): boolean {
    return this.selectedSockets.length > 0
      || this.selectedRamTypes.length > 0
      || this.selectedHasGpu !== null
      || this.selectedHasOs  !== null
      || this.currentMinPrice > this.minPrice
      || this.currentMaxPrice < this.maxPrice;
  }

  private applyAll(): void {
    let result = [...this.allPcs];

    if (this.selectedSockets.length)
      result = result.filter(p => this.selectedSockets.includes(p.cpu.socket.name));
    if (this.selectedRamTypes.length)
      result = result.filter(p => this.selectedRamTypes.includes(p.ram.type));
    if (this.selectedHasGpu !== null)
      result = result.filter(p => (p.gpu != null) === this.selectedHasGpu);
    if (this.selectedHasOs !== null)
      result = result.filter(p => (p.os != null) === this.selectedHasOs);

    result = result.filter(p => p.price >= this.currentMinPrice && p.price <= this.currentMaxPrice);

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
    this.displayedPcs = result.slice(start, start + this.pageSize);
  }

  private toggle<T>(arr: T[], val: T): void {
    const i = arr.indexOf(val);
    i >= 0 ? arr.splice(i, 1) : arr.push(val);
  }

  protected isSelected<T>(arr: T[], val: T): boolean { return arr.includes(val); }

  protected getQty(id: number): number { return this.quantities.get(id) ?? 1; }

  protected changeQty(id: number, delta: number, max: number): void {
    const next = (this.quantities.get(id) ?? 1) + delta;
    if (next < 1 || next > max) return;
    this.quantities.set(id, next);
  }
}
