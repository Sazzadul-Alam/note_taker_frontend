import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  page = 0;
  size = 5;
  total = 0;

  name = '';
  email = '';
  password = '';
  role: 'USER' | 'ADMIN' = 'USER';
  interests = '';
  editingUserId: string | null = null;
  errorMessage = '';
  isSaving = false;
  deletingId: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getAdminUsers(this.page, this.size).subscribe({
      next: (res) => {
        this.users = res.items;
        this.total = res.total;
      },
      error: () => {
        this.errorMessage = 'Failed to load users';
      }
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.total) {
      this.page++;
      this.loadUsers();
    }
  }

  saveUser(): void {
    const interestsList = this.interests
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    this.isSaving = true;
    this.errorMessage = '';

    if (this.editingUserId) {
      const payload: any = {
        name: this.name,
        email: this.email,
        role: this.role,
        interests: interestsList
      };
      if (this.password) {
        payload.password = this.password;
      }
      this.apiService.updateAdminUser(this.editingUserId, payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.cancelEdit();
          this.loadUsers();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = err.error || 'Failed to update user';
        }
      });
    } else {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        interests: interestsList
      };
      this.apiService.createAdminUser(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.cancelEdit();
          this.loadUsers();
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = err.error || 'Failed to create user';
        }
      });
    }
  }

  editUser(user: User): void {
    this.editingUserId = user.id || null;
    this.name = user.name;
    this.email = user.email;
    this.password = '';
    this.role = user.role;
    this.interests = (user.interests || []).join(', ');
  }

  cancelEdit(): void {
    this.editingUserId = null;
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = 'USER';
    this.interests = '';
  }

  deleteUser(id: string | undefined): void {
    if (!id) return;
    this.deletingId = id;
    this.errorMessage = '';
    this.apiService.deleteAdminUser(id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadUsers();
      },
      error: () => {
        this.deletingId = null;
        this.errorMessage = 'Failed to delete user';
      }
    });
  }
}

