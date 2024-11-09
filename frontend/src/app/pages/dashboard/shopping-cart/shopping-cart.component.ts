import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  constructor(private appService: AppService, private tokenService:TokenService,
    private router:Router
  ) {};
  
  carrito: any[] = [];
  detalleCarrito: any[] = [];

  ngOnInit(): void {
    this.getCarrito();
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  getPrecioImpuesto(product: any): string {
    const getPrecioImpuesto = product.precio + (product.precio*product.impuesto); 
    const precioIRedondeado = Math.round(getPrecioImpuesto / 50) * 50;
    return precioIRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getImpuesto(product: any): number {
    return Math.round(product.impuesto * 100);
  }

  getSubTotalProducto(detalle:any): number {
    var subtotal = detalle.cantidad * ((detalle.producto.precio)*(1+detalle.producto.impuesto))
    return Math.round(subtotal / 50) * 50;
  }

  getStringSubTotalProducto(detalle:any): string {
    return this.getSubTotalProducto(detalle).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  redondearPrecio(product: any): string {
    const precioRedondeado = Math.round(product.precio / 50) * 50;
    return precioRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  aumentarCantidad(detalle: any): void {
    if (detalle.cantidad < detalle.producto.cantidad) {
      detalle.cantidad = detalle.cantidad + 1; 
    }else {
      alert("Stock of '" + detalle.producto.nombre + "' = " + detalle.producto.cantidad + 
        "\n\nPlease reduce the quantity to buy or select a different product.");
    }
    //this.actualizarDetalleCarrito(detalle)
  }

  disminuirCantidad(detalle: any): void {
    if (detalle.cantidad > 1) {
      detalle.cantidad = detalle.cantidad - 1; 
    }
    //this.actualizarDetalleCarrito(detalle)
  }

  getSubTotal(){
    var subtotal = 0;
    this.detalleCarrito.forEach(detalle => {
      subtotal = subtotal + this.getSubTotalProducto(detalle);
    });
    var subtotalR =  Math.round(subtotal / 50) * 50;
    return subtotalR.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getCarrito(): void { 
    this.appService.getCarrito().subscribe(
      (response) => {
        this.carrito = response;
        this.detalleCarrito = response.detalleCarrito;
        
        //Si sucedió un error al finalizar la compra y redirigió al usuario
        //al carrito, automaticamente actualizara la cantidad a comprar para que
        //iguale el stock disponible
        this.detalleCarrito.forEach(detalle => {
          if (detalle.cantidad > detalle.producto.cantidad) {
                detalle.cantidad = detalle.producto.cantidad
          }
        });
        //console.log(this.carrito);
      },
      (error) => {
        console.error('Error fetching shoppingCart', error);
      }
    );
  }

  eliminarDetalle(idDetalle:number){
    this.appService.eliminarDetalleCarrito(idDetalle).subscribe(
      (response) => {
        this.getCarrito();
        //console.log(this.carrito);
      },
      (error) => {
        console.error("Error Deleting a 'DetalleProducto'", error);
      }
    );
  }

  goCheckout(){
    if (this.detalleCarrito.length == 0) {
      alert("¡Your shopping cart is empty, please add a product!")
    }else {
      this.router.navigate(['/checkout']);
    }
  }

  actualizarDetalleCarrito(detalle:any){
    this.appService.updateDetalleCarrito(detalle.id, detalle.cantidad).subscribe(
      (response) => {
        //console.log(response);
        this.getCarrito();
      },
      (error) => {
        console.error("Error Deleting a 'DetalleProducto'", error);
      }
    );
  }

  ngOnDestroy(): void {
    this.detalleCarrito.forEach(detalle => {
        this.actualizarDetalleCarrito(detalle);
    });
    window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  onBeforeUnload(event: BeforeUnloadEvent) {
    this.detalleCarrito.forEach(detalle => {
        this.actualizarDetalleCarrito(detalle);
    });
  }
}