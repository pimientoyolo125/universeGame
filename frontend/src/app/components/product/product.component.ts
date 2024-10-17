import { Component, Input, inject, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
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

  getStock(): {nombre: string, color: string} {
    if (this.product != null) {
      if (this.product.cantidad > 10) {
        return {nombre: 'Available', color:'#28a745'};
      }
      else if (this.product.cantidad > 0 && this.product.cantidad < 10) {
        return {nombre: 'Last Units', color:'#ffc107'};
      }
      else {
        return {nombre: 'Sold Out', color:'dc3545'};
      }
    }
    else {
      return {nombre: 'No product', color: '6c757d'};
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

  redondearPrecio(): string {
    if (this.product != null) {
      const precioRedondeado = Math.round(this.product.precio / 50) * 50;
        return precioRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    else {
      return '0';
    }
  }

  private modalService = inject(NgbModal);

  openXl(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl', centered:true });
	}
}
