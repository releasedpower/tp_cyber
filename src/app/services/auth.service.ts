import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // your Node API

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/auth/login`,
      { username, password },
      { withCredentials: true } // IMPORTANT: send cookies
    );
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  logout() {
  return this.http.post(
    'http://localhost:3000/auth/logout',
    {},
    { withCredentials: true } // send the cookie
  );
}
}
