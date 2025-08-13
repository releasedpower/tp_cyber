import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

onLogin() {
  this.authService.login(this.username, this.password).subscribe({
    next: (res: any) => {
      console.log('Login success', res.message);
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.errorMessage = err.error?.error || 'Login failed';
    }
  });
}
}
