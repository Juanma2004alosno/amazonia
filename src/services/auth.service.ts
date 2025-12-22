
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal to hold the current user state
  readonly currentUser = signal<User | null>(null);

  constructor(private router: Router) {}

  login(email: string, pass: string): boolean {
    // Mock login logic
    if (email && pass) {
      const name = email.split('@')[0];
      this.currentUser.set({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email
      });
      return true;
    }
    return false;
  }

  register(name: string, email: string, pass: string): boolean {
    if (name && email && pass) {
      this.currentUser.set({ name, email });
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}
