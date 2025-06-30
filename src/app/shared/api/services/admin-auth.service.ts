import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { 
  RegisterAdminRequest,
  LoginAdminRequest,
  RegisterAdminResponse,
  LoginAdminResponse,
  LogoutAdminResponse,
  GetAdminResponse,
 } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private http = inject(HttpClient);

  private apiPrefix = '/api/admin';

  register(data: RegisterAdminRequest) {
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.fingerprint) formData.append('fingerprint', data.fingerprint);
    if (data.avatar) formData.append('avatar', data.avatar);

    return this.http.post<RegisterAdminResponse>(
      `${this.apiPrefix}/register`,
      formData
    ).pipe(
      catchError(this.handleError)
    );
  }

  login(data: LoginAdminRequest) {
    const body: any = { email: data.email };
    if (data.password !== null) body.password = data.password;
    if (data.fingerprint !== null) body.fingerprint = data.fingerprint;

    return this.http.post<LoginAdminResponse>(
      `${this.apiPrefix}/login`,
      body
    ).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    return this.http.post<LogoutAdminResponse>(
      `${this.apiPrefix}/logout`,
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAdmin() {
    return this.http.get<GetAdminResponse>(
      `${this.apiPrefix}/me`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Error Code: ${error.status}\nMessage: ${error.message}`;

    return throwError(() => new Error(errorMessage));
  }
}