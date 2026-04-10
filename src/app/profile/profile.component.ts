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
  adminTab:     'orders' | 'users' = 'orders';
  expandedAdminOrderId: number | null = null;

  readonly ORDER_STATUSES = ['PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED'];

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
    if (this.adminUsers.length === 0)  this.loadAdminUsers();
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

  updateOrderStatus(orderId: number, status: string): void {
    this.adminService.updateOrderStatus(orderId, status)
      .subscribe(() => this.loadAdminOrders());
  }

  deleteUser(id: number, username: string): void {
    if (!confirm(`Изтрий потребител "${username}"?`)) return;
    this.adminService.deleteUser(id).subscribe(() => this.loadAdminUsers());
  }

  changeRole(id: number, role: 'USER' | 'ADMIN'): void {
    this.adminService.changeRole(id, role).subscribe(() => this.loadAdminUsers());
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleAdminOrder(id: number): void {
    this.expandedAdminOrderId = this.expandedAdminOrderId === id ? null : id;
  }
}
