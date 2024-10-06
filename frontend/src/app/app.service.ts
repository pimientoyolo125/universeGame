import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = environment.Url;

  constructor(
    private http: HttpClient
  ) { }

  getTest() {
    return this.http.get(this.url+'/usuario/test', { responseType: 'text' });
  }
}
