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

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.base}/admin/products/${id}`, data, { headers: this.headers() });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/products/${id}`, { headers: this.headers() });
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.base}/admin/products`, data, { headers: this.headers() });
  }

  getSockets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/sockets`);
  }

  getInterfaces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/interfaces`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/admin/products/${id}`, { headers: this.headers() });
  }

  /*
  PC parts
   */
  getCpus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/cpu`);
  }

  getCoolers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/coolers`);
  }

  getMotherboards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/motherboards`);
  }

  getRams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/ram`);
  }

  getRoms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/rom`);
  }

  getGpus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/gpu`);
  }

  getPsus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/psu`);
  }

  getOss(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/os`);
  }

  getBoxes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/boxes`);
  }

  getAccessories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/products/accessories`);
  }
}
