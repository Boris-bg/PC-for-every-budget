import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  readonly VAT_RATE = 0.20;

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private router: Router
  ) {}

  get subtotal(): number { return this.cart.total; }
  get vatAmount(): number { return Math.round(this.subtotal / (1 + this.VAT_RATE) * this.VAT_RATE * 100) / 100; }
  get totalWithVat(): number { return this.subtotal; }

  updateQty(productId: number, qty: number): void {
    this.cart.updateQty(productId, qty);
  }

  remove(productId: number): void {
    this.cart.remove(productId);
  }

  checkout(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/auth'], { state: { returnUrl: '/checkout' } });
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}
