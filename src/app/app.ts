import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService, SearchResult } from './services/search.service';
import { Product } from './models/Product';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

// Map product types to their category routes
const PRODUCT_ROUTES: Record<string, string> = {
  'CPU':               '/products/cpu',
  'GPU':               '/products/gpu',
  'RAM':               '/products/ram',
  'Motherboard':       '/products/motherboard',
  'ROM':               '/products/rom',
  'PSU':               '/products/psu',
  'Cooler':            '/products/cpu-coolers',
  'Box':               '/products/boxes',
  'Monitor':           '/products/monitors',
  'Keyboard':          '/products/keyboards',
  'Mouse':             '/products/mouses',
  'Accessory':         '/products/accessories-parts',
  'PeripheralAccessory':'/products/accessories-peripherals',
  'OS':                '/products/os',
  'PC':                '/products/assembled-pcs',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, FormsModule, CommonModule,
    MatSidenavModule, MatListModule, MatIconModule,
    MatButtonModule, MatInputModule, MatFormFieldModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected isProductsOpen    = false;
  protected isSidenavExpanded = false;
  protected itemForSearching  = '';
  protected showDropdown      = false;

  protected productResults:  Product[]      = [];
  protected categoryResults: SearchResult[] = [];

  private searchSubject = new Subject<string>();
  private closeTimeout: any;

  constructor(
    private searchService: SearchService,
    private router: Router,
    public auth: AuthService,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.categoryResults = this.searchService.searchCategories(query);
        if (query.trim().length < 2) {
          this.productResults = [];
          return [];
        }
        return this.searchService.search(query);
      })
    ).subscribe(results => {
      this.productResults = (results as Product[]).slice(0, 6);
      this.showDropdown = this.productResults.length > 0 || this.categoryResults.length > 0;
    });
  }

  protected onSearchInput(): void {
    const q = this.itemForSearching.trim();
    if (q.length < 2) {
      this.productResults  = [];
      this.categoryResults = [];
      this.showDropdown    = false;
    }
    this.searchSubject.next(this.itemForSearching);
  }

  protected onSearchFocus(): void {
    if (this.productResults.length > 0 || this.categoryResults.length > 0) {
      this.showDropdown = true;
    }
  }

  protected closeDropdown(): void {
    // Small delay so click on result registers first
    setTimeout(() => { this.showDropdown = false; }, 150);
  }

  protected selectProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
    this.showDropdown     = false;
    this.itemForSearching = '';
  }

  protected selectCategory(result: SearchResult): void {
    this.router.navigate([result.route], { state: result.state });
    this.showDropdown     = false;
    this.itemForSearching = '';
  }

  protected search(): void {
    if (!this.itemForSearching.trim()) return;
    this.router.navigate(['/search'], { queryParams: { q: this.itemForSearching } });
    this.showDropdown = false;
  }

  // Close dropdown on Escape
  @HostListener('document:keydown.escape')
  protected onEscape(): void { this.showDropdown = false; }

  protected openProducts():     void { clearTimeout(this.closeTimeout); this.isProductsOpen = true; }
  protected closeProducts():    void { this.closeTimeout = setTimeout(() => { this.isProductsOpen = false; }, 200); }
  protected expandSidenav():    void { this.isSidenavExpanded = true; }
  protected collapseSidenav():  void { this.isSidenavExpanded = false; }
}
