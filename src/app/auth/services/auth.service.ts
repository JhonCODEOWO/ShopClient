import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { UserLogged } from '../interfaces/user-logged.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  route = `${environment.API_URL}/auth`;
  httpClient = inject(HttpClient);
  token = signal<string | null>(localStorage.getItem('token'));
  private user = signal<UserLogged | null>(this.initializeUser());

  _user = computed(() => this.user)

  login(email: string, password: string): Observable<string>{
    return this.httpClient.post<{token: string}>(`${this.route}/login`, {email, password})
    .pipe(
      map(response => response.token),
      tap(token => this.handleLogin(token)),
    );
  }

  handleLogin(token: string){
    this.token.set(token);
    localStorage.setItem('token', token);
    this.getUser().pipe(take(1)).subscribe(user => {
      this.user.set(user);
      localStorage.setItem('userData', JSON.stringify(user));
    });
  }

  handleLogout(){
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  logout(): Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.route}/logout`).pipe(tap((success) => this.handleLogout()));
  }

  /**
   * Request user data from backend using token in request
   * @returns Observable<UserLogged | null>
   */
  getUser(): Observable<UserLogged | null>{
    if(!this.token()) return of(null);
    return this.httpClient.get<UserLogged>(`${this.route}/user`);
  }

  initializeUser(): UserLogged | null{
    const data = localStorage.getItem('userData');
    if(!data || !this.token()) return null;
    return JSON.parse(data);
  }
}
