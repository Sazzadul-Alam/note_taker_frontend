import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, Note, PageResponse, Post, User, InterestGroup, UserPostsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Auth
  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, data);
  }

  // Notes (User)
  getNotes(page: number, size: number): Observable<PageResponse<Note>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<Note>>(`${this.baseUrl}/notes`, { params });
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/notes/${id}`);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/notes`, note);
  }

  updateNote(id: string, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/notes/${id}`, note);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notes/${id}`);
  }

  // Admin Notes
  getAdminNotes(page: number, size: number): Observable<PageResponse<Note>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<Note>>(`${this.baseUrl}/admin/notes`, { params });
  }

  // Admin Users
  getAdminUsers(page: number, size: number): Observable<PageResponse<User>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<User>>(`${this.baseUrl}/admin/users`, { params });
  }

  createAdminUser(user: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/admin/users`, user);
  }

  updateAdminUser(id: string, user: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/admin/users/${id}`, user);
  }

  deleteAdminUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/users/${id}`);
  }

  // Posts
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  // Aggregations
  getUsersByInterests(page: number, size: number): Observable<InterestGroup[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<InterestGroup[]>(`${this.baseUrl}/users/by-interests`, { params });
  }

  getUserPosts(userId: string, page: number, size: number): Observable<UserPostsResponse> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<UserPostsResponse>(`${this.baseUrl}/users/${userId}/posts`, { params });
  }
}
