import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mouse } from '../models/Mouse';

@Injectable({ providedIn: 'root' })
export class MouseService {
  private apiUrl = 'http://localhost:8080/api/products/mice';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Mouse[]> { return this.http.get<Mouse[]>(this.apiUrl); }
}
