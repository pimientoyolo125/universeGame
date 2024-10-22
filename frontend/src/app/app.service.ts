import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { UsuarioRegistro } from './models/UserRegisterModel/usuario-registro.model';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = environment.Url; 
  headers: any = {};

  constructor( private http: HttpClient, private tokenService:TokenService) {
    this.headers  = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`  
    });
    //console.log(this.headers);
  }

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

    return this.http.post(this.url + '/producto/listar/filtro', marca, { params });
  }

  login(correo: string, contrasena: string): Observable<any> {
    const body = { correo, contrasena };
    return this.http.post(this.url + '/usuario/login', body);
  }

  getCarrito(): Observable<any> {
    var headers = this.headers;
    var correo = this.tokenService.getUser()?.correo;
    return this.http.get(this.url + `/carrito/usuario/${correo}`, {headers});
  }

  añadirProductoCarrito(idProducto:number, cantidad:number): void {
    var headers = this.headers;
    this.getCarrito().subscribe(
      (carrito)=> {
        const idCarrito = carrito.id;
        const body = { idCarrito, idProducto, cantidad};
        this.http.get(this.url + `/detalle-carrito/agregar`, {headers}).subscribe(
          (res)=> {
            console.log('Producto de id', idProducto, " Agregado x", cantidad)
          }
        );
      }
    );
  }

  signUp( informacionDeRegistro: UsuarioRegistro ): Observable<any> {
    const body = {
      correo: informacionDeRegistro.correo,
      contrasena: informacionDeRegistro.contrasena,
      confirmarContrasena: informacionDeRegistro.confirmarContrasena,
      nombre: informacionDeRegistro.nombre,
      apellido: informacionDeRegistro.apellido,
      telefono: informacionDeRegistro.telefono
    };

    return this.http.post(this.url + '/usuario/registrar', body);

  }
}