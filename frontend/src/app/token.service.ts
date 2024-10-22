import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) { }
  url = environment.Url;
  private token:any = null;

  setToken(token: string) {
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  clearToken() {
    localStorage.removeItem(this.token); 
  }

  getUser(){
    var token = this.getToken();
    if (token != null) {
      //console.log(jwtDecode(token));
      return jwtDecode(token);  
    }
    else {
      return token;
    } 
  }

  validToken():Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  
    console.log(token);
    return this.http.get(this.url + '/usuario/validToken', {headers});
  }

  isAuthenticated(): boolean {
    var answer:boolean = false;
    this.validToken(
    ).subscribe(
      (response) => {
        if (response == true) {
          answer = true;
        }
      },
      (error) => {
        console.error('Error fetching validToken', error);
      }
    );
    return this.getToken() !== null;
  }
}
