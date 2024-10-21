import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

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

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
