import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PC } from '../models/PC';
import { PcService } from '../services/pc.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

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
  protected selectedHasRgbRam: boolean | null = null;
  protected selectedCoolingTypes: string[] = [];
  protected availableCoolingTypes: string[] = [];

  protected minPrice        = 0;
  protected maxPrice        = 5000;
  protected currentMinPrice = 0;
  protected currentMaxPrice = 5000;

  protected availableSockets:  string[] = [];
  protected availableRamTypes: string[] = [];

  protected selectedBoxFormFactors: string[] = [];
  protected selectedPsuEfficiency:  string[] = [];
  protected selectedRamSizes:       number[] = [];
  protected selectedCores:          number[] = [];

  protected availableBoxFormFactors: string[] = [];
  protected availablePsuEfficiency:  string[] = [];
  protected availableRamSizes:       number[] = [];
  protected availableCores:          number[] = [];

  // ── Sort & pagination ─────────────────────────────
  protected sortBy      = 'rating';
  protected pageSize    = 6;
  protected currentPage = 1;
  protected totalPages  = 1;
  protected totalItems  = 0;
  protected pages:        number[] = [];
  protected quantities:   Map<number, number> = new Map();

  constructor(
    private service: PcService,
    private cart: CartService,
    private router: Router
  ) {}

  protected addToCart(pc: PC): void {
    this.cart.add(pc, this.getQty(pc.id));
  }

  protected goToCart(pc: PC): void {
    this.cart.add(pc, this.getQty(pc.id));
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.allPcs = data;

      this.availableSockets = [...new Set(data.map(p => p.cpu.socket.name))].sort();
      this.availableRamTypes = [...new Set(data.map(p => p.ram.type))].sort();
      this.availableBoxFormFactors = [...new Set(data.map(p => p.box.boxFormFactor))].sort();
      this.availablePsuEfficiency = [...new Set(data.map(p => p.psu.efficiency))].sort();
      this.availableRamSizes = [...new Set(data.map(p => p.ram.memorySizeGB))].sort((a, b) => a - b);
      this.availableCores = [...new Set(data.map(p => p.cpu.cores))].sort((a, b) => a - b);
      this.availableCoolingTypes = [...new Set(data.map(p => p.cooler.coolingType))].sort();

      this.minPrice        = Math.floor(Math.min(...data.map(p => p.price)));
      this.maxPrice        = Math.ceil(Math.max(...data.map(p => p.price)));
      this.currentMinPrice = this.minPrice;
      this.currentMaxPrice = this.maxPrice;

      this.applyAll();
    });
  }

  protected toggleSocket(s: string): void {
    this.toggle(this.selectedSockets, s);
    this.applyAll();
  }

  protected toggleRamType(t: string): void {
    this.toggle(this.selectedRamTypes, t);
    this.applyAll();
  }

  protected toggleBoxFormFactor(v: string): void {
    this.toggle(this.selectedBoxFormFactors, v);
    this.applyAll();
  }

  protected togglePsuEfficiency(v: string): void {
    this.toggle(this.selectedPsuEfficiency, v);
    this.applyAll();
  }

  protected toggleRamSize(v: number): void {
    this.toggle(this.selectedRamSizes, v);
    this.applyAll();
  }

  protected toggleCores(v: number): void {
    this.toggle(this.selectedCores, v);
    this.applyAll();
  }

  protected toggleHasRgbRam(): void {
    this.selectedHasRgbRam = this.selectedHasRgbRam === null ? true : this.selectedHasRgbRam ? false : null;
    this.applyAll();
  }

  protected toggleHasGpu(): void {
    this.selectedHasGpu = this.selectedHasGpu === null ? true : this.selectedHasGpu ? false : null;
    this.applyAll();
  }

  protected toggleCoolingType(v: string): void {
    this.toggle(this.selectedCoolingTypes, v);
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
    this.selectedBoxFormFactors = [];
    this.selectedPsuEfficiency  = [];
    this.selectedRamSizes       = [];
    this.selectedCores          = [];
    this.selectedHasGpu   = null;
    this.selectedHasRgbRam = null;
    this.selectedCoolingTypes = [];
    this.currentMinPrice  = this.minPrice;
    this.currentMaxPrice  = this.maxPrice;
    this.currentPage      = 1;
    this.applyAll();
  }

  get hasActiveFilters(): boolean {
    return this.selectedSockets.length > 0
      || this.selectedRamTypes.length > 0
      || this.selectedHasGpu !== null
      || this.currentMinPrice > this.minPrice
      || this.currentMaxPrice < this.maxPrice
      || this.selectedBoxFormFactors.length > 0
      || this.selectedPsuEfficiency.length  > 0
      || this.selectedRamSizes.length       > 0
      || this.selectedCores.length          > 0
      || this.selectedHasRgbRam !== null
      || this.selectedCoolingTypes.length > 0;
  }

  private applyAll(): void {
    let result = [...this.allPcs];

    if (this.selectedSockets.length)
      result = result.filter(p => this.selectedSockets.includes(p.cpu.socket.name));
    if (this.selectedRamTypes.length)
      result = result.filter(p => this.selectedRamTypes.includes(p.ram.type));
    if (this.selectedHasGpu !== null)
      result = result.filter(p => (p.gpu != null) === this.selectedHasGpu);
    if (this.selectedBoxFormFactors.length)
      result = result.filter(p => this.selectedBoxFormFactors.includes(p.box.boxFormFactor));
    if (this.selectedPsuEfficiency.length)
      result = result.filter(p => this.selectedPsuEfficiency.includes(p.psu.efficiency));
    if (this.selectedRamSizes.length)
      result = result.filter(p => this.selectedRamSizes.includes(p.ram.memorySizeGB));
    if (this.selectedCores.length)
      result = result.filter(p => this.selectedCores.includes(p.cpu.cores));
    if (this.selectedHasRgbRam !== null)
      result = result.filter(p => p.ram.isRGB === this.selectedHasRgbRam);
    if (this.selectedCoolingTypes.length)
      result = result.filter(p => this.selectedCoolingTypes.includes(p.cooler.coolingType));

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
