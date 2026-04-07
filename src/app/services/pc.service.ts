import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PC } from '../models/PC';

@Injectable({ providedIn: 'root' })
export class PcService {
  private apiUrl = 'http://localhost:8080/api/products/pcs';
  constructor(private http: HttpClient) {}
  getAll(): Observable<PC[]> { return this.http.get<PC[]>(this.apiUrl); }
}
