// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

interface AuthCheckResponse {
  loggedIn: boolean;
  userId?: number;
}

export const loginRedirectGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<AuthCheckResponse>('http://localhost:3000/auth/check', { withCredentials: true }).pipe(
    tap((res) => {
      if (res.loggedIn) {
        router.navigate(['/home']);
      }
    }),
    map((res) => !res.loggedIn), // return true if NOT logged in
    catchError(() => of(true)) // On error, allow access to login
  );
};
