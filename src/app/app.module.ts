import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminNotesComponent } from './pages/admin-notes/admin-notes.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotesComponent,
    AdminUsersComponent,
    AdminNotesComponent,
    InterestsComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
