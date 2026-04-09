import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  username = '';
  password = '';
  confirmPassword = '';
  error    = '';
  loading  = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.error   = '';
    this.loading = true;

    if (this.mode === 'login') {
      this.auth.login(this.username, this.password).subscribe({
        next: () => {
          const returnUrl = this.router.getCurrentNavigation()?.extras?.state?.['returnUrl']
            ?? history.state?.returnUrl
            ?? '/';
          this.router.navigate([returnUrl]);
        },
        error: err => {
          this.error   = err.error?.error ?? 'Грешка при вход';
          this.loading = false;
        }
      });
    } else {
      if (this.password !== this.confirmPassword) {
        this.error   = 'Паролите не съвпадат';
        this.loading = false;
        return;
      }
      this.auth.register(this.username, this.password).subscribe({
        next: () => {
          this.mode    = 'login';
          this.error   = '';
          this.loading = false;
        },
        error: err => {
          this.error   = err.error?.error ?? 'Грешка при регистрация';
          this.loading = false;
        }
      });
    }
  }
}
