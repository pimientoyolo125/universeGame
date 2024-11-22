import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  constructor(private router: Router) {};

  @Input() order!: {
    id: number;
    fecha: string;
    observaciones: string;
    usuario: {
      id: number;
      nombre: string;
      apellido: string;
      telefono: string;
      tipoUsuario: {
        id: number;
        nombre: string;
        descripcion: string;
      };
    };
    total: number;
    detalleVenta: Array<{
      id: number;
      idVenta: number;
      producto: {
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
      cantidad: number;
    }>;
    direccion: string;
  }

  @Output() closeDetail = new EventEmitter<void>();

  redirectTo() {
    this.closeDetail.emit();
  }

  formatDate(dateString: string): string[] {
    const date = new Date(dateString);
    
    // Extraer componentes de fecha y hora
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Formato deseado: YYYY/MM/DD HH:MM
    //return `${year}/${month}/${day} ${hours}:${minutes}`;
    return [`${year}/${month}/${day}`, `${hours}:${minutes}`];
  }

  formatTotal(): string {
    const total = Math.round(this.order.total/50)*50;
    return total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatAdress(): string[] {
    return this.order.direccion.split(' - ');
  }

  getPrecioImpuesto(product: any): string {
    const getPrecioImpuesto = product.precio + (product.precio*product.impuesto); 
    const precioIRedondeado = Math.round(getPrecioImpuesto / 50) * 50;
    return precioIRedondeado.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getSubTotalProducto(detalleVenta:any): string {
    var subtotal = detalleVenta.cantidad * ((detalleVenta.producto.precio)*(1+detalleVenta.producto.impuesto))
    return (Math.round(subtotal / 50) * 50).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

}