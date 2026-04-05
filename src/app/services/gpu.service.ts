import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GPU } from '../models/GPU';

@Injectable({ providedIn: 'root' })
export class GpuService {
  private apiUrl = 'http://localhost:8080/api/products/gpu';
  constructor(private http: HttpClient) {}
  getAll(): Observable<GPU[]> { return this.http.get<GPU[]>(this.apiUrl); }
}
