import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { InterestGroup } from '../../models';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html'
})
export class InterestsComponent implements OnInit {
  groups: InterestGroup[] = [];
  page = 0;
  size = 5;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  loadInterests(): void {
    this.apiService.getUsersByInterests(this.page, this.size).subscribe({
      next: (res) => {
        this.groups = res;
      },
      error: () => {
        this.errorMessage = 'Failed to load interests';
      }
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadInterests();
    }
  }

  nextPage(): void {
    // If returned list is smaller than size, we might be at the end, but allow next if full page
    if (this.groups.length === this.size) {
      this.page++;
      this.loadInterests();
    }
  }
}

