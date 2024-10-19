import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(): Observable<any> {
    return this.http.get(this.url+ '/producto/listar');
  }

  getCategories(): Observable<any> {
    return this.http.get(this.url+ '/tipo-producto/listar');
  }

  getFilteredProducts(nombre:any, marca:string[], idTipo:number, sortAsc:boolean): 
  Observable<any> {
    var params = new HttpParams()
    .set('nombre', nombre)
    .set('marca', marca[1])
    .set('ascendenteModelo', sortAsc); 
    
    if (idTipo !== 0) {
      params = params.set('idTipo', idTipo);
    }
    
  /*// Para arrays, debes usar append:
  marca.forEach(m => {
    params.append('marca', m);
  });*/

  // Hacer la solicitud GET con los parámetros
  return this.http.get(this.url + '/producto/listar/filtro', { params });
  }
}
