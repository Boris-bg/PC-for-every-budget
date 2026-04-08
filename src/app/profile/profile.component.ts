import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService, Order } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  tab: 'orders' | 'password' = 'orders';

  orders: Order[] = [];
  ordersLoading = true;

  currentPassword = '';
  newPassword     = '';
  confirmPassword = '';
  passwordMsg     = '';
  passwordError   = '';
  passwordLoading = false;

  constructor(
    public auth: AuthService,
    private orderService: OrderService,
    public cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/auth']); return; }
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: orders => { this.orders = orders; this.ordersLoading = false; },
      error: ()     => { this.ordersLoading = false; }
    });
  }

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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      PENDING:    'Получена',
      PROCESSING: 'Обработва се',
      SHIPPED:    'Изпратена',
      DELIVERED:  'Доставена',
      CANCELLED:  'Отказана',
    };
    return map[s] ?? s;
  }

  statusClass(s: string): string {
    const map: Record<string, string> = {
      PENDING:    'status--pending',
      PROCESSING: 'status--processing',
      SHIPPED:    'status--shipped',
      DELIVERED:  'status--delivered',
      CANCELLED:  'status--cancelled',
    };
    return map[s] ?? '';
  }
}
