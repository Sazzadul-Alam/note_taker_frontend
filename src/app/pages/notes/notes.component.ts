import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Note } from '../../models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  page = 0;
  size = 5;
  total = 0;

  title = '';
  content = '';
  editingNoteId: string | null = null;
  errorMessage = '';
  isSaving = false;
  deletingId: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.apiService.getNotes(this.page, this.size).subscribe({
      next: (res) => {
        this.notes = res.items;
        this.total = res.total;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load notes';
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

  saveNote(): void {
    this.isSaving = true;
    this.errorMessage = '';
    if (this.editingNoteId) {
      this.apiService.updateNote(this.editingNoteId, { title: this.title, content: this.content }).subscribe({
        next: () => {
          this.isSaving = false;
          this.cancelEdit();
          this.loadNotes();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Failed to update note';
        }
      });
    } else {
      this.apiService.createNote({ title: this.title, content: this.content }).subscribe({
        next: () => {
          this.isSaving = false;
          this.title = '';
          this.content = '';
          this.loadNotes();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Failed to create note';
        }
      });
    }
  }

  editNote(note: Note): void {
    this.editingNoteId = note.id || null;
    this.title = note.title;
    this.content = note.content;
  }

  cancelEdit(): void {
    this.editingNoteId = null;
    this.title = '';
    this.content = '';
  }

  deleteNote(id: string | undefined): void {
    if (!id) return;
    this.deletingId = id;
    this.errorMessage = '';
    this.apiService.deleteNote(id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadNotes();
      },
      error: () => {
        this.deletingId = null;
        this.errorMessage = 'Failed to delete note';
      }
    });
  }
}

