import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // your Node API

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/auth/login`,
      { username, password },
      { withCredentials: true } // IMPORTANT: send cookies
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:3000/auth/logout',
      {},
      { withCredentials: true } // send the cookie
    );
  }
  getLoggedinUserId() {
    return this.http.get<{ userId: number }>(`${this.apiUrl}/auth/check`, {
      withCredentials: true,
    });
  }

}
