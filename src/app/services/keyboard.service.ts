import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keyboard } from '../models/Keyboard';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private apiUrl = 'http://localhost:8080/api/products/keyboards';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Keyboard[]> { return this.http.get<Keyboard[]>(this.apiUrl); }
}
