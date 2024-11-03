import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, switchMap } from 'rxjs';
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

  añadirProductoCarrito(idProducto: number, cantidad: number): Observable<any> {
    return this.getCarrito().pipe(
      switchMap((carrito) => {
        const idCarrito = carrito.id;
        //console.log(carrito);
        const body = { idCarrito, idProducto, cantidad };
        return this.http.post(this.url + '/detalle-carrito/agregar', body, { headers: this.headers });
      })
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

  crearDireccion(pais:string, region: string, ciudad:string, 
    direccion:string): Observable<any> {
    var headers = this.headers;
    var correo = this.tokenService.getUser()?.correo;
    const body = {
      pais: pais,
      region: region,
      ciudad: ciudad,
      direccion: direccion
    };
    return this.http.post(this.url + `/direccion/crear/usuario/${correo}`, body, {headers});
  }

  getDireccion(): Observable<any>{
    var headers = this.headers;
    var correo = this.tokenService.getUser()?.correo;
    return this.http.get(this.url + `/direccion/usuario/${correo}`, {headers});
  }

  actualizarDireccion(pais:string, region: string, ciudad:string, 
    direccion:string): Observable<any> {
    var headers = this.headers;
    var correo = this.tokenService.getUser()?.correo;
    const body = {
      pais: pais,
      region: region,
      ciudad: ciudad,
      direccion: direccion
    };
    return this.http.put(this.url + `/direccion/actualizar/usuario/${correo}`, body, {headers});
  }

  registrarVenta(): Observable<any> {
      var headers = this.headers;
      var correo = this.tokenService.getUser()?.correo;
      
      if (correo == undefined) {
        correo = 'a';
      }

      let params = new HttpParams()
        .set('correoUsuario', correo)
        .set('observaciones', "N.A");
      return this.http.post(this.url + `/venta/registrar`, null, {headers, params});
  }
}