import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://74.208.44.191:3004/api';
  private apiPassword = 'Gr33nL1f3#cgm#';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiPassword}`,
      'Content-Type': 'application/json' // Ensure JSON content type for PUT
    });
  }

  login(correo: string, contrasena: string): Observable<any> {
    const body = { correo, contrasena };
    return this.http.post(`${this.apiUrl}/login`, body, { headers: this.getHeaders() }).pipe(
      tap((response: any) => {
        if (response.data?.usuario?.id) {
          localStorage.setItem('userId', response.data.usuario.id.toString()); // Save user ID to localStorage
        }
      })
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id}`, { headers: this.getHeaders() });
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}`, userData, { headers: this.getHeaders() });
  }

  updateUserImage(id: string, imageData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}/imagen`, imageData, { headers: this.getHeaders() });
  }

  logout(): void {
    localStorage.removeItem('userId'); // Clear user ID from localStorage
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`, { headers: this.getHeaders() });
  }

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, userData, { headers: this.getHeaders() });
  }
}