import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../token.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  constructor(private appService: AppService, private tokenService:TokenService) {};
  
  products: any[] = [];
  carrito: any[] = [];
  cantidadComprar = 1;

  ngOnInit(): void {
    this.filterProducts(); 
    this.getCarrito();
  }

  getPrecioImpuesto(product: any): string {
    const getPrecioImpuesto = product.precio + (product.precio*product.impuesto); 
    const precioIRedondeado = Math.round(getPrecioImpuesto / 50) * 50;
    return precioIRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getImpuesto(product: any): number {
    return Math.round(product.impuesto * 100);
  }

  redondearPrecio(product: any): string {
    const precioRedondeado = Math.round(product.precio / 50) * 50;
    return precioRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  filterProducts(): void {
    this.appService.getFilteredProducts(
      '', [], (0), false
    ).subscribe(
      (response) => {
        this.products = response.slice(0, 3);
        //console.log(response.length);
      },
      (error) => {
        console.error('Error fetching filteredProducts', error);
      }
    );
  }

  aumentarCantidad(): void {
    this.cantidadComprar = this.cantidadComprar + 1; 
  }

  disminuirCantidad(): void {
    if (this.cantidadComprar > 1) {
      this.cantidadComprar = this.cantidadComprar - 1;
    }
  }

  getCarrito(): void { 
    this.appService.getCarrito(
      'admin@admin.com'
    ).subscribe(
      (response) => {
        this.carrito = response;
        console.log(this.carrito);
      },
      (error) => {
        console.error('Error fetching shoppingCart', error);
      }
    );
  }
}
