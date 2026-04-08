import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

export interface CartItem {
  product:  Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  get items():  CartItem[] { return this.itemsSubject.value; }
  get count():  number     { return this.items.reduce((s, i) => s + i.quantity, 0); }
  get total():  number     { return this.items.reduce((s, i) => s + i.product.price * i.quantity, 0); }

  add(product: Product, quantity = 1): void {
    const items = [...this.items];
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.save(items);
  }

  remove(productId: number): void {
    this.save(this.items.filter(i => i.product.id !== productId));
  }

  updateQty(productId: number, quantity: number): void {
    if (quantity <= 0) { this.remove(productId); return; }
    const items = this.items.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    this.save(items);
  }

  clear(): void { this.save([]); }

  private save(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('cart') ?? '[]'); }
    catch { return []; }
  }
}
