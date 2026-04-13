import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  phone           = '';
  deliveryType:   'DELIVERY' | 'PICKUP' = 'DELIVERY';
  deliveryAddress = '';
  paymentMethod:  'CASH_ON_DELIVERY' | 'CARD' = 'CASH_ON_DELIVERY';

  loading  = false;
  step:    'form' | 'card-pending' | 'success' = 'form';
  orderId: number | null = null;
  error   = '';

  readonly VAT_RATE = 0.20;
  readonly STORE_ADDRESS = 'ул. "Райко Алексиев" 48, София, 1113, ж.к. Изток';

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/auth'], { state: { returnUrl: '/checkout' } });
      return;
    }
    if (this.cart.items.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  get subtotal(): number { return this.cart.total; }
  get vatAmount(): number { return Math.round(this.subtotal / (1 + this.VAT_RATE) * this.VAT_RATE * 100) / 100; }

  placeOrder(): void {
    this.error = '';

    if (!this.phone.trim()) { this.error = 'Въведи телефон за връзка'; return; }
    if (this.deliveryType === 'DELIVERY' && !this.deliveryAddress.trim()) {
      this.error = 'Въведи адрес за доставка'; return;
    }

    this.loading = true;

    const payload = {
      items: this.cart.items.map(i => ({
        product:         { id: i.product.id },
        quantity:        i.quantity,
        priceAtPurchase: i.product.price
      })),
      phone:           this.phone,
      deliveryAddress: this.deliveryType === 'PICKUP' ? this.STORE_ADDRESS : this.deliveryAddress,
      deliveryType:    this.deliveryType,
      paymentMethod:   this.paymentMethod
    };

    this.orderService.place(payload).subscribe({
      next: order => {
        this.orderId = order.id;
        this.loading = false;
        this.cart.clear();

        if (this.paymentMethod === 'CASH_ON_DELIVERY') {
          this.step = 'success';
        } else {
          this.step = 'card-pending';
        }
      },
      error: () => {
        this.error   = 'Грешка при изпращане на поръчката. Опитай отново.';
        this.loading = false;
      }
    });
  }

  goHome(): void { this.router.navigate(['/']); }
  goOrders(): void { this.router.navigate(['/profile']); }
}
