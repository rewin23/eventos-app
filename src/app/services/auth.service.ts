import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'auth_user';
  private usersKey = 'users';

  get currentUser(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      localStorage.setItem(this.storageKey, JSON.stringify(found));
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    if (users.some(u => u.username === user.username)) {
      return false; // usuario ya existe
    }
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}
