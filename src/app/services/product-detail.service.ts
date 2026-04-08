import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {
  private apiUrl = 'http://localhost:8080/api/products';
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
