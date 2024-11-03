import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppService } from '../../app.service';
import { TokenService } from '../../token.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditAdressModalComponent } from '../../components/edit-adress-modal/edit-adress-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, EditAdressModalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private appService: AppService, private tokenService:TokenService,
    private router:Router
  ) {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (!isAuth) {
          alert("You haven't signed in yet, please do it and try again.");
          this.router.navigate(['/login']);
        }
      }
    )
  };

  carrito: any[] = [];
  detalleCarrito: any[] = [];

  ngOnInit(): void {
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
    detalle.cantidad = detalle.cantidad + 1; 
  }

  disminuirCantidad(detalle: any): void {
    if (detalle.cantidad > 1) {
      detalle.cantidad = detalle.cantidad - 1; 
    }
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
        //console.log(this.carrito);
      },
      (error) => {
        console.error('Error fetching shoppingCart', error);
      }
    );
  }

  private modalService = inject(NgbModal);

  editAdressModal() {
    const modalRef = this.modalService.open(EditAdressModalComponent);
  }
}