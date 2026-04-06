import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeripheralAccessory } from '../models/PeripheralAccessory';

@Injectable({ providedIn: 'root' })
export class PeripheralAccessoryService {
  private apiUrl = 'http://localhost:8080/api/products/peripheral-accessories';
  constructor(private http: HttpClient) {}
  getAll(): Observable<PeripheralAccessory[]> {
    return this.http.get<PeripheralAccessory[]>(this.apiUrl);
  }
}
