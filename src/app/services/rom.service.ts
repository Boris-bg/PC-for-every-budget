import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROM } from '../models/ROM';

@Injectable({ providedIn: 'root' })
export class RomService {
  private apiUrl = 'http://localhost:8080/api/products/rom';
  constructor(private http: HttpClient) {}
  getAll(): Observable<ROM[]> { return this.http.get<ROM[]>(this.apiUrl); }
}
