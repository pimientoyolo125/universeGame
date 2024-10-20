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
    return this.http.get(this.url + '/producto/listar');
  }

  getCategories(): Observable<any> {
    return this.http.get(this.url + '/tipo-producto/listar');
  }

  getBrands(): Observable<any> {
    return this.http.get(this.url + '/producto/listar/marcas');
  }

  getFilteredProducts(nombre: any, marca: string[], idTipo: number, sortAsc: boolean):
    Observable<any> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('ascendenteModelo', sortAsc);

    if (idTipo !== 0) {
      params = params.set('idTipo', idTipo);
    }

    return this.http.post(this.url + '/producto/listar/filtro', marca, {params});
  }
}
