import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface OrderItem { productId: number; quantity: number; priceAtPurchase: number; }
export interface Order {
  id:            number;
  total:         number;
  status:        'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt:     string;
  items:         OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.token}` });
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my`, { headers: this.headers() });
  }

  place(order: { items: { product: { id: number }; quantity: number; priceAtPurchase: number }[] }): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, { headers: this.headers() });
  }
}
