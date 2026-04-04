import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CPU } from '../models/CPU';

@Injectable({ providedIn: 'root' })
export class CpuService {
  private apiUrl = 'http://localhost:8080/api/products/cpu';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CPU[]> {
    return this.http.get<CPU[]>(this.apiUrl);
  }
}
