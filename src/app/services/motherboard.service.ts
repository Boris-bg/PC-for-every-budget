import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motherboard } from '../models/Motherboard';

@Injectable({ providedIn: 'root' })
export class MotherboardService {
  private apiUrl = 'http://localhost:8080/api/products/motherboards';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Motherboard[]> { return this.http.get<Motherboard[]>(this.apiUrl); }
}
