import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OS } from '../models/OS';

@Injectable({ providedIn: 'root' })
export class OsService {
  private apiUrl = 'http://localhost:8080/api/products/os';
  constructor(private http: HttpClient) {}
  getAll(): Observable<OS[]> { return this.http.get<OS[]>(this.apiUrl); }
}
