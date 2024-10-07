import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductComponent } from '../../components/product/product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  latestProduct: { 
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
  } = { 
    idTipoProducto: 1, 
    id: 1,
    nombre: "Nintendo Switch Pro controller",
    descripcion: "Lleva tus sesiones de juego a un nivel superior con el controlador Nintendo Switch Pro",
    imagen: "https://m.media-amazon.com/images/I/71F5nnoo8gL._SL1300_.jpg",
    precio: 287438,
    marca: "Nintendo", 
    color: "#1C1B17",
    modelo: 2017, 
    cantidad: 100, 
  };
  
  constructor(private router: Router) {}
  onSearch(categorie:number) {
    this.router.navigate(['/search'], { queryParams: { q: '', c:categorie } });
  }
}
