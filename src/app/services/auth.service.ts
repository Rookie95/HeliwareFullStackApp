import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    const loginData = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          return true;
        }
        return false;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}
