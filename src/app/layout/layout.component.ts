import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private router: Router, private authService:AuthService) { }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.router.navigate(['/login']); // go to login page
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

  home() {
    this.router.navigate(['/home']);
  }
}
