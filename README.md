# Secure Note-Taking App - Frontend

Frontend client for Secure Note-Taking Application built with **Angular 14**, clean HTML5, and responsive custom CSS.

---

## 🚀 Live Backend Integration
The frontend is already configured with the live Render production backend:
- **API Base URL**: `https://note-taker-oxfz.onrender.com/api`
- Configured in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.

---

## 🛠 Tech Stack & Architecture
- **Framework**: Angular 14
- **Styling**: Clean, lightweight custom CSS (no heavy external UI libraries)
- **State & HTTP**:
  - `AuthService` - Manages token, user session, and role state.
  - `AuthInterceptor` - Attaches `Bearer <token>` to all HTTP requests and handles 401 unauthorized errors.
  - `AdminGuard` - Route guard protecting admin pages (`/admin/users`, `/admin/notes`).
  - `ApiService` - Centralized service for all backend calls reading from environment.

---

## 📱 Features & Pages

| Route | Page | Access Level | Description |
|---|---|---|---|
| `/login` | Auth | Public | Sign In and Registration forms with role & interests |
| `/notes` | My Notes | Logged In | Paginated list of notes, create new note, inline edit, and delete |
| `/interests` | Interests | Logged In | Users grouped by interest with member counts and user links |
| `/users/:id/posts` | User Posts | Logged In | Posts by selected user with pagination + form to create new post |
| `/admin/users` | Admin Users | Admin Only | Full CRUD operations on user accounts with pagination |
| `/admin/notes` | Admin Notes | Admin Only | Global paginated list of all notes from every user |

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm (v10+)
- Angular CLI

### Steps to Run
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```
Navigate to `http://localhost:4200/` in your browser.

---

## 🏗 Production Build
```bash
npm run build
```
The production bundle will be output to `dist/notes-frontend/`.

---

## 🌐 Deployment (Vercel / Netlify / Render Static Site)
The application includes a `src/_redirects` file for Single Page Application (SPA) routing.
- **Build Command**: `npm run build`
- **Output Directory**: `dist/notes-frontend`
