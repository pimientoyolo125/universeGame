import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) { }
  url = environment.Url;
  private token: any = null;

  setToken(token: string) {
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  clearToken() {
    localStorage.removeItem(this.token);
  }

  getUser(): User | null{
    var token = this.getToken();
    if (token != null) {
      //console.log(jwtDecode(token));
      return jwtDecode<User>(token);
    }
    else {
      return null;
    }
  }

  validToken(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    //console.log(token);
    return this.http.get(this.url + '/usuario/validToken', { headers });
  }

  isAuthenticated(): Observable<boolean> {
    if (this.getToken() == null) {
      return of(false);
    } else {
      return this.validToken().pipe(
        map((response) => {
          return response === true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
    }
  }
}
