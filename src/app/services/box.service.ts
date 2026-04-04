import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Box } from '../models/Box';

@Injectable({ providedIn: 'root' })
export class BoxService {
  private apiUrl = 'http://localhost:8080/api/products/boxes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Box[]> {
    return this.http.get<Box[]>(this.apiUrl);
  }
}
