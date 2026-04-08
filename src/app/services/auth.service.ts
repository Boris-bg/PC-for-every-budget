import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private userSubject = new BehaviorSubject<User | null>(this.loadUser());

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): User | null { return this.userSubject.value; }
  get isLoggedIn():  boolean     { return !!this.userSubject.value; }
  get isAdmin():     boolean     { return this.userSubject.value?.role === 'ADMIN'; }
  get token():       string | null { return localStorage.getItem('token'); }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
        const user: User = { id: res.id, username: res.username, role: res.role };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }));
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  private loadUser(): User | null {
    try { return JSON.parse(localStorage.getItem('user') ?? 'null'); }
    catch { return null; }
  }
}
