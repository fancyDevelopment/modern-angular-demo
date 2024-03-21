import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated();
}

@Injectable({ providedIn: 'root' })
export class AuthGuard  implements CanActivate {
  auth = inject(AuthService);

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}
