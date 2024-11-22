import { Component, Input, inject, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app.service'; 
import { TokenService } from '../../token.service';
import { ModalVerificationComponent } from '../modal-verification/modal-verification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(private appService: AppService, private tokenService:TokenService,
    private router:Router, private modalService:NgbModal
  ) {};

  @Input() product!: { 
    id: number;
    nombre: string;
    descripcion: string;
    tipoProducto: {
      id: number;
      nombre: string;
      descripcion: string;
    };
    imagen: string;
    precio: number;
    marca: string;
    color: string;
    modelo: number;
    cantidad: number;
    impuesto: number;
  };

  estado = "Nuevo";
  isInfoModalOpen:boolean = false;

  getStock(): {nombre: string, color: string} {
    if (this.product != null) {
      if (this.product.cantidad > 10) {
        return {nombre: 'Available', color:'#28a745'};
      }
      else if (this.product.cantidad > 0 && this.product.cantidad < 10) {
        return {nombre: 'Last Units', color:'#ffc107'};
      }
      else {
        return {nombre: 'Sold Out', color:'#dc3545'};
      }
    }
    else {
      return {nombre: 'No product', color: '#6c757d'};
    }
  }

  cantidadComprar = 1;

  aumentarCantidad(): void {
    this.cantidadComprar = this.cantidadComprar + 1; 
  }

  disminuirCantidad(): void {
    if (this.cantidadComprar > 1) {
      this.cantidadComprar = this.cantidadComprar - 1;
    }
  }

  productoAlCarrito():void {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          if(this.cantidadComprar<= this.product.cantidad){
            this.appService.añadirProductoCarrito(this.product.id, this.cantidadComprar).subscribe(
              (res)=> {
                //console.log(res);
                this.router.navigate(['/account/shoppingCart']);
              },
              (error) => {
                const errorMessage = error.error?.message || error.message;
                if (errorMessage.includes("Not enough product in")) {
                  console.clear()
                  alert("There is not enough stock of '"+ this.product.nombre +"'."
                    + "\n\nJust in case, please check if you already have this product in your shopping cart.")
                }else {
                  console.error('Error Adding Products to the cart', error);
                }
              }
            );
          } else{
            alert("Stock of '" + this.product.nombre + "' = " + this.product.cantidad + 
              "\n\nPlease reduce the quantity to buy or select a different product.");
          }    
        } else {
          alert("You haven't signed in yet, you cant add products to your shopping cart.");
        }
      }
    )
  }

  comprarAhora():void {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          if(this.cantidadComprar<= this.product.cantidad){
            this.appService.añadirProductoCarrito(this.product.id, this.cantidadComprar).subscribe(
              (res)=> {
                //console.log(res);
                this.router.navigate(['/checkout']);
              },
              (error) => {
                console.error('Error Adding Products to the cart', error);
              }
            );
          } else{
            alert("Stock of '" + this.product.nombre + "' = " + this.product.cantidad + 
              "\n\nPlease reduce the quantity to buy or select a different product.");
          } 
        } else {
          alert("You haven't signed in yet, you can't buy a product right now.");
        }
      }
    )
  }

  redondearPrecio(): string {
    if (this.product != null) {
      const precioRedondeado = Math.round(this.product.precio / 50) * 50;
        return precioRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    else {
      return '0';
    }
  }

  openInfoModal(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl', centered:true });
    this.isInfoModalOpen = true;
	}

  openVerifModal(caso: number) {
    const modalRef = this.modalService.open(ModalVerificationComponent);
    modalRef.componentInstance.modalClass = 'TACenter';
    if (caso == 1) {
      modalRef.componentInstance.verificationText = `Do you want to add to your cart: '${this.product.nombre}' - Quantity = ${this.cantidadComprar}?`;  
    }
    else {
      modalRef.componentInstance.verificationText = `Do you want to buy '${this.product.nombre}' - Quantity = ${this.cantidadComprar}?`;
    }
    
    modalRef.componentInstance.onButtonClick = () => {
      if (this.isInfoModalOpen) {
        this.modalService.dismissAll();
        this.isInfoModalOpen = false;
      }
      modalRef.close();
      if (caso == 1) {
        this.productoAlCarrito();
      }
      else {
        this.comprarAhora();
      }
    }
  }
}