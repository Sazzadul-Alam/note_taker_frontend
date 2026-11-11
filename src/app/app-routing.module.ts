import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminNotesComponent } from './pages/admin-notes/admin-notes.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'users/:id/posts', component: UserPostsComponent },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/notes', component: AdminNotesComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'notes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
