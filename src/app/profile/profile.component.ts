import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService, Order } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  tab: 'orders' | 'password' | 'admin' = 'orders';

  // ── User orders ────────────────────────────────────
  orders: Order[] = [];
  ordersLoading = true;
  expandedOrderId: number | null = null;

  // ── Password ───────────────────────────────────────
  currentPassword = '';
  newPassword     = '';
  confirmPassword = '';
  passwordMsg     = '';
  passwordError   = '';
  passwordLoading = false;

  // ── Admin ──────────────────────────────────────────
  adminOrders:  any[] = [];
  adminUsers:   any[] = [];
  adminLoading  = false;
  adminTab:     'orders' | 'users' | 'products' = 'orders';
  expandedAdminOrderId: number | null = null;

  adminProducts:    any[]    = [];
  productsLoading   = false;
  productSearch     = '';
  editingProduct:   any | null = null;
  editForm = {
    name:              '',
    price:             0,
    brand:             '',
    availability:      0,
    rating:            0,
    additionalDetails: '',
    imageUrl:          ''
  };

  showAddForm = false;
  addCategory = '';
  sockets: any[] = [];
  interfaces: any[] = [];
  addForm: any = {};
  addError = '';
  addLoading = false;

  readonly CATEGORIES = [
    'CPU', 'GPU', 'RAM', 'ROM', 'Motherboard',
    'Cooler', 'PSU', 'Box', 'OS', 'Accessory', 'Peripheral'
  ];
  readonly ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(
    public  auth:         AuthService,
    private orderService: OrderService,
    public  cart:         CartService,
    private router:       Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/auth']); return; }
    this.loadOrders();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // ── Orders ─────────────────────────────────────────
  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: orders => { this.orders = orders; this.ordersLoading = false; },
      error: err   => { console.error('Orders error:', err); this.ordersLoading = false; }
    });
  }

  toggleOrder(id: number): void {
    this.expandedOrderId = this.expandedOrderId === id ? null : id;
  }

  trackingSteps(status: string): { label: string; icon: string; done: boolean; active: boolean }[] {
    const steps = [
      { key: 'PENDING',    label: 'Получена',     icon: '📋' },
      { key: 'PROCESSING', label: 'Обработва се', icon: '⚙️' },
      { key: 'SHIPPED',    label: 'Изпратена',    icon: '🚚' },
      { key: 'DELIVERED',  label: 'Доставена',    icon: '✅' },
    ];
    const order = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIdx = order.indexOf(status);
    return steps.map((s, i) => ({
      ...s,
      done:   i < currentIdx,
      active: i === currentIdx,
    }));
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      PENDING: 'Получена', PROCESSING: 'Обработва се',
      SHIPPED: 'Изпратена', DELIVERED: 'Доставена', CANCELLED: 'Отказана',
    };
    return map[s] ?? s;
  }

  statusClass(s: string): string {
    const map: Record<string, string> = {
      PENDING: 'status--pending', PROCESSING: 'status--processing',
      SHIPPED: 'status--shipped', DELIVERED: 'status--delivered',
      CANCELLED: 'status--cancelled',
    };
    return map[s] ?? '';
  }

  paymentLabel(p: string): string {
    return p === 'CASH_ON_DELIVERY' ? 'Наложен платеж' : 'Карта';
  }

  deliveryTypeLabel(t: string): string {
    return t === 'PICKUP' ? 'Взимане от магазина' : 'Доставка до адрес';
  }

  // ── Password ───────────────────────────────────────
  changePassword(): void {
    this.passwordMsg = this.passwordError = '';
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Новите пароли не съвпадат'; return;
    }
    this.passwordLoading = true;
    this.auth.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.passwordMsg     = 'Паролата е сменена успешно!';
        this.currentPassword = this.newPassword = this.confirmPassword = '';
        this.passwordLoading = false;
      },
      error: err => {
        this.passwordError   = err.error?.error ?? 'Грешка';
        this.passwordLoading = false;
      }
    });
  }

  // ── Admin ──────────────────────────────────────────
  onAdminTab(): void {
    if (this.adminOrders.length === 0) this.loadAdminOrders();
    if (this.adminUsers.length === 0) this.loadAdminUsers();
    if (this.adminProducts.length === 0) this.loadAdminProducts();

    this.adminService.getSockets().subscribe(s => this.sockets = s);
    this.adminService.getInterfaces().subscribe(i => this.interfaces = i);
  }

  loadAdminOrders(): void {
    this.adminLoading = true;
    this.adminService.getOrders().subscribe({
      next: o => { this.adminOrders = o; this.adminLoading = false; },
      error: () => { this.adminLoading = false; }
    });
  }

  loadAdminUsers(): void {
    this.adminService.getUsers().subscribe({
      next: u => this.adminUsers = u
    });
  }

  updateOrderStatus(orderId: number, status: string, selectEl: HTMLSelectElement): void {
    if (status === 'CANCELLED') {
      const confirmed = confirm(
        `Сигурни ли сте, че искате да откажете поръчка #${orderId}?\nТова действие ще върне наличността на продуктите и не може да бъде отменено.`
      );
      if (!confirmed) {
        const order = this.adminOrders.find(o => o.id === orderId);
        if (order) selectEl.value = order.status;
        return;
      }
    }

    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.loadAdminOrders(),
      error: err => {
        alert(err.error?.error ?? 'Грешка при промяна на статуса');
        this.loadAdminOrders();
      }
    });
  }

  deleteUser(id: number, username: string): void {
    if (!confirm(`Изтрий потребител "${username}"?`)) return;
    this.adminService.deleteUser(id).subscribe(() => this.loadAdminUsers());
  }

  changeRole(id: number, role: 'USER' | 'ADMIN'): void {
    this.adminService.changeRole(id, role).subscribe(() => this.loadAdminUsers());
  }

  toggleAdminOrder(id: number): void {
    this.expandedAdminOrderId = this.expandedAdminOrderId === id ? null : id;
  }

  loadAdminProducts(): void {
    this.productsLoading = true;
    this.adminService.getAllProducts().subscribe({
      next: p => { this.adminProducts = p; this.productsLoading = false; },
      error: () => { this.productsLoading = false; }
    });
  }

  get filteredProducts(): any[] {
    const q = this.productSearch.toLowerCase().trim();
    if (!q) return this.adminProducts;
    return this.adminProducts.filter(p =>
      p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q)
    );
  }

  startEdit(product: any): void {
    this.editingProduct = product;
    this.editForm = {
      name:              product.name              ?? '',
      price:             product.price             ?? 0,
      brand:             product.brand             ?? '',
      availability:      product.availability      ?? 0,
      rating:            product.rating            ?? 0,
      additionalDetails: product.additionalDetails ?? '',
      imageUrl:          product.imageUrl          ?? ''
    };
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  saveProduct(): void {
    if (!this.editingProduct) return;
    this.adminService.updateProduct(this.editingProduct.id, this.editForm)
      .subscribe(() => {
        this.editingProduct = null;
        this.loadAdminProducts();
      });
  }

  deleteProduct(id: number, name: string): void {
    if (!confirm(`Изтрий продукт "${name}"?`)) return;
    this.adminService.deleteProduct(id).subscribe(() => this.loadAdminProducts());
  }

  openAddForm(): void {
    this.showAddForm = true;
    this.addCategory = '';
    this.addForm     = { availability: 0, rating: 4.5, warrantyPeriod: 24 };
    this.addError    = '';
  }

  closeAddForm(): void {
    this.showAddForm = false;
  }

  submitNewProduct(): void {
    if (!this.addCategory) { this.addError = 'Избери категория'; return; }
    if (!this.addForm.name || !this.addForm.price) {
      this.addError = 'Попълни поне Ime и Цена'; return;
    }
    this.addLoading = true;
    this.adminService.createProduct({ ...this.addForm, category: this.addCategory })
      .subscribe({
        next: () => {
          this.addLoading  = false;
          this.showAddForm = false;
          this.loadAdminProducts();
        },
        error: err => {
          this.addError   = err.error?.error ?? 'Грешка при създаване';
          this.addLoading = false;
        }
      });
  }
}
