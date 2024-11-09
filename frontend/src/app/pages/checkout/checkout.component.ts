import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppService } from '../../app.service';
import { TokenService } from '../../token.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAdressModalComponent } from '../../components/edit-adress-modal/edit-adress-modal.component';
import { ModalVerificationComponent } from '../../components/modal-verification/modal-verification.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, 
    EditAdressModalComponent, ModalVerificationComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private appService: AppService, private tokenService:TokenService,
    private router:Router, private modalService:NgbModal
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
  direccion: any = {
    "pais": "N.A",
    "region": "N.A",
    "ciudad": "N.A",
    "direccion": "N.A"
  };
  isVerifModalOpen = false;

  ngOnInit(): void {
    this.getCarrito();
    this.getDireccion();
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

  getDireccion(): void { 
    this.appService.getDireccion().subscribe(
      (response) => {
        this.direccion = response;
        //console.log(response);
      },
      (error) => {
        console.clear();
        //console.error('Error fetching address', error);
      }
    );
  }

  editAdressModal() {
    const modalRef = this.modalService.open(EditAdressModalComponent);
    
    //Generamos una copia de this.direccion para que sean "independientes"
    modalRef.componentInstance.address = JSON.parse(JSON.stringify(this.direccion));
    
    //Cuando se cierre, verificamos la actualización trayendo nuevamente los
    //datos de la DB
    modalRef.closed.subscribe(() => {
      this.getDireccion();
    });
  }

  openVerifModal() {
    const modalRef = this.modalService.open(ModalVerificationComponent);
    modalRef.componentInstance.modalClass = 'TAJustify';
    modalRef.componentInstance.verificationText = `Do you want to place this order?<br> 
    - Please Verify your Billing Information.<br> - Please Verify the Products that you are buying and their price.`;
    modalRef.componentInstance.onButtonClick = () => {
      if (this.isVerifModalOpen) {
        this.modalService.dismissAll();
        this.isVerifModalOpen = false;
      }
      modalRef.close();
      this.placeOrder();
    }
  }

  placeOrder(){
    //Auxiliar para verificar que la dirección es valida
    var invalidAddress = false;

    //Recorremos cada componente de la dirección
    Object.keys(this.direccion).forEach((key) => {
      if (this.direccion[key].trim() == 'N.A' || this.direccion[key].trim() == '') {
        invalidAddress = true;
      }
    });

    //Si la dirección ES VALIDA procedemos con la compra
    if (invalidAddress == false) {
      this.appService.registrarVenta().subscribe(
        (response) => {
          //console.log(response);
          this.router.navigate(['/orderPlaced']);
        },
        (error) => {
          const errorMessage = error.error?.message || error.message;
          if (errorMessage.includes("Not enough stock for")) {
            console.clear()
            alert("There is not enough stock for at least one product in your shopping cart."
               + "\n\nPlease adjust the quantity or consider choosing other products.")
            this.router.navigate(['/account/shoppingCart']);
          }else{
            console.error('Error placing an Order:', error);
          }
        }
      );
    } else {
      alert("Your Billing Information is Invalid, Update your information and try again")
    }
  }
}