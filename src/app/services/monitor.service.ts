import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monitor } from '../models/Monitor';

@Injectable({ providedIn: 'root' })
export class MonitorService {
  private apiUrl = 'http://localhost:8080/api/products/monitors';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Monitor[]> { return this.http.get<Monitor[]>(this.apiUrl); }
}
