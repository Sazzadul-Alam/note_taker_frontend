import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { ApiService } from './services/api.service';
import { Subscription, interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'notes-frontend';
  private pingSubscription: Subscription | null = null;

  // প্রতি 10 মিনিটে একবার ping — Render free tier 15 মিনিট idle-এ service off করে
  private readonly PING_INTERVAL_MS = 10 * 60 * 1000;

  constructor(
    public authService: AuthService,
    public loadingService: LoadingService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // সাথে সাথে একবার ping করে backend জাগিয়ে দাও
    this.sendPing();
    // তারপর প্রতি 10 মিনিটে ping করতে থাকো
    this.pingSubscription = interval(this.PING_INTERVAL_MS).pipe(
      switchMap(() => this.apiService.ping().pipe(catchError(() => EMPTY)))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.pingSubscription?.unsubscribe();
  }

  private sendPing(): void {
    this.apiService.ping().pipe(catchError(() => EMPTY)).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
