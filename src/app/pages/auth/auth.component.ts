import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  loginEmail = '';
  loginPassword = '';

  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerRole = 'USER';
  registerInterests = '';

  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onLogin(): void {
    this.errorMessage = '';
    this.apiService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: (res: any) => {
        this.authService.saveAuth(res.token, {
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role
        });
        this.router.navigate(['/notes']);
      },
      error: (err: any) => {
        this.errorMessage = err.error || 'Login failed';
      }
    });
  }

  onRegister(): void {
    this.errorMessage = '';
    const interestsArray = this.registerInterests
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
      role: this.registerRole,
      interests: interestsArray
    };

    this.apiService.register(payload).subscribe({
      next: (res: any) => {
        this.authService.saveAuth(res.token, {
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role
        });
        this.router.navigate(['/notes']);
      },
      error: (err: any) => {
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
