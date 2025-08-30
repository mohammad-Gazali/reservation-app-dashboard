import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Admin, AdminAuthService } from '@shared/api';
import { AUTH_TOKEN_KEY } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminAuth = inject(AdminAuthService);

  /**
   * `null` for non authed user, `undefined` for not determined state, and `User` for authed
   */
  public currentUser = signal<Admin | undefined | null>(undefined);

  constructor() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      this.currentUser.set(null);
    } else {
      this.adminAuth.getAdmin().pipe(
        takeUntilDestroyed()
      ).subscribe(res => {
        this.currentUser.set(res.admin);
      })
    }
  }
}