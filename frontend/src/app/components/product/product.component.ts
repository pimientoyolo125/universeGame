import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: { 
    idTipoProducto: number; 
    id: number; 
    nombre: string; 
    descripcion: string; 
    imagen: string; 
    precio: number; 
    marca: string; 
    color: string; 
    modelo: number; 
    cantidad: number 
  };

}
