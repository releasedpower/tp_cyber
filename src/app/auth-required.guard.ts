// auth-required.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

interface AuthCheckResponse {
  loggedIn: boolean;
  userId?: number;
}

export const authRequiredGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<AuthCheckResponse>('http://localhost:3000/auth/check', { withCredentials: true }).pipe(
    tap((res) => {
      if (!res.loggedIn) {
        router.navigate(['/login']); // Not logged in → redirect to login
      }
    }),
    map((res) => res.loggedIn), // Allow activation only if logged in
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
