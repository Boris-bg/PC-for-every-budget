import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.token}` });
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`, { headers: this.headers() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/users/${id}`, { headers: this.headers() });
  }

  changeRole(id: number, role: 'USER' | 'ADMIN'): Observable<User> {
    return this.http.patch<User>(`${this.base}/users/${id}/role?role=${role}`,
      {}, { headers: this.headers() });
  }

  // Orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/orders`, { headers: this.headers() });
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.base}/orders/${id}/status?status=${status}`,
      {}, { headers: this.headers() });
  }

  // Products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/all`, { headers: this.headers() });
  }

  updateProduct(id: number, data: Partial<any>): Observable<any> {
    return this.http.patch(`${this.base}/products/${id}`, data, { headers: this.headers() });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/products/${id}`, { headers: this.headers() });
  }
}
