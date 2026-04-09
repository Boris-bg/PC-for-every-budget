import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

export interface OrderItemPayload {
  product: { id: number };
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];
  phone: string;
  deliveryAddress: string;
  deliveryType: 'PICKUP' | 'DELIVERY';
  paymentMethod: 'CASH_ON_DELIVERY' | 'CARD';
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
  phone?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}

@Injectable({providedIn: 'root'})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.auth.token}`});
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my`, {headers: this.headers()});
  }

  place(payload: OrderPayload): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, payload, {headers: this.headers()});
  }
}
