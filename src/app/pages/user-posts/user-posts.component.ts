import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Post, UserPostsResponse } from '../../models';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html'
})
export class UserPostsComponent implements OnInit {
  userId = '';
  userData: UserPostsResponse | null = null;
  page = 0;
  size = 5;

  newTitle = '';
  newContent = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.page = 0;
        this.loadUserPosts();
      }
    });
  }

  loadUserPosts(): void {
    if (!this.userId) return;
    this.apiService.getUserPosts(this.userId, this.page, this.size).subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: () => {
        this.errorMessage = 'Failed to load posts for user';
      }
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadUserPosts();
    }
  }

  nextPage(): void {
    if (this.userData && (this.page + 1) * this.size < this.userData.total) {
      this.page++;
      this.loadUserPosts();
    }
  }

  createPost(): void {
    if (!this.newTitle.trim()) return;
    this.apiService.createPost({ title: this.newTitle, content: this.newContent }).subscribe({
      next: () => {
        this.newTitle = '';
        this.newContent = '';
        this.loadUserPosts();
      },
      error: () => {
        this.errorMessage = 'Failed to create post';
      }
    });
  }
}

