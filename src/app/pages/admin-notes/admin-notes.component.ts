import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Note } from '../../models';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html'
})
export class AdminNotesComponent implements OnInit {
  notes: Note[] = [];
  page = 0;
  size = 5;
  total = 0;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.apiService.getAdminNotes(this.page, this.size).subscribe({
      next: (res) => {
        this.notes = res.items;
        this.total = res.total;
      },
      error: () => {
        this.errorMessage = 'Failed to load all notes';
      }
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadNotes();
    }
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.total) {
      this.page++;
      this.loadNotes();
    }
  }
}

