import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { UsuarioRegistro } from './models/UserRegisterModel/usuario-registro.model';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = environment.Url; 
  headers: any = {};

  constructor( private http: HttpClient, private tokenService:TokenService, private router:Router) {
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
        this.http.post(this.url + '/detalle-carrito/agregar', body, {headers}).subscribe(
          (res)=> {
            //console.log('Producto de id', idProducto, " Agregado x", cantidad, " En el carrito de ID:",idCarrito);
            this.router.navigate(['/account/shoppingCart']);
          },
          (error) => {
            console.error('Error Adding Products to the cart', error);
          }
        );
      }
    );
  }

  eliminarDetalleCarrito(idDetalleCarrito:number){
    var headers = this.headers;
    return this.http.delete(this.url + `/detalle-carrito/eliminar/${idDetalleCarrito}`, {headers});
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

  updateDetalleCarrito(idDetalleCarrito:number, cantidad: number){
    var headers = this.headers;
    return this. http.put(this.url + `/detalle-carrito/actualizar?idDetalleCarrito=${idDetalleCarrito}&cantidad=${cantidad}`, null, {headers})
  }
}