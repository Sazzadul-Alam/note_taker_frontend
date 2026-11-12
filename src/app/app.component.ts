import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'notes-frontend';

  constructor(
    public authService: AuthService,
    public loadingService: LoadingService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}
