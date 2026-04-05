import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PSU } from '../models/PSU';

@Injectable({ providedIn: 'root' })
export class PsuService {
  private apiUrl = 'http://localhost:8080/api/products/psu';
  constructor(private http: HttpClient) {}
  getAll(): Observable<PSU[]> { return this.http.get<PSU[]>(this.apiUrl); }
}
