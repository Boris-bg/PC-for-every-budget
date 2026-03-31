import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RAM } from '../models/RAM';

@Injectable({ providedIn: 'root' })
export class RamService {
  private apiUrl = 'http://localhost:8080/api/products/ram';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RAM[]> {
    return this.http.get<RAM[]>(this.apiUrl);
  }
}
