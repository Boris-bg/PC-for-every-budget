import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accessory } from '../models/Accessory';

@Injectable({ providedIn: 'root' })
export class AccessoryService {
  private apiUrl = 'http://localhost:8080/api/products/accessories';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Accessory[]> { return this.http.get<Accessory[]>(this.apiUrl); }
}
