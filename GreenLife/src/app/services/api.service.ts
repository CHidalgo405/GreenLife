import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://74.208.44.191:3004/api';
  private apiPassword = 'Gr33nL1f3#cgm#';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiPassword}`
    });
  }

  login(correo: string, contrasena: string): Observable<any> {
    const body = {
      correo,
      contrasena
    };
    return this.http.post(`${this.apiUrl}/login`, body, { headers: this.getHeaders() });
  }

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, userData, { headers: this.getHeaders() });
  }
}