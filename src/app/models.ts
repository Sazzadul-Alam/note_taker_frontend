export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'USER' | 'ADMIN';
  interests: string[];
  createdAt?: string;
}

export interface Note {
  id?: string;
  ownerId?: string;
  title: string;
  content: string;
  createdAt?: string;
}

export interface Post {
  id?: string;
  authorId?: string;
  title: string;
  content: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface PageResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export interface InterestGroup {
  interest: string;
  count: number;
  users: { id: string; name: string }[];
}

export interface UserPostsResponse {
  userId: string;
  userName: string;
  email: string;
  posts: Post[];
  total: number;
  page: number;
  size: number;
}

