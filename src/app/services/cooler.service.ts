import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cooler } from '../models/Cooler';

@Injectable({ providedIn: 'root' })
export class CoolerService {
  private apiUrl = 'http://localhost:8080/api/products/coolers';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Cooler[]> { return this.http.get<Cooler[]>(this.apiUrl); }
}
