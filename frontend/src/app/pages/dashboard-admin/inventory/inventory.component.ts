import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{
  constructor(private appService: AppService) {};

  categories = [{ name: 'Consoles', id: 2 }, { name: 'Games', id: 3 }, { name: 'Controllers', id: 4 },
  { name: 'Accessories', id: 5 }, { name: 'Recorders', id: 6 }, { name: "TV's & Monitors", id: 7 }
  ];
  products: any[] = [];

  ngOnInit(): void {
    this.getProducts(); 
    console.log(this.products.length)
  }

  selectedCategory: number = 1;
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = +selectElement.value;
    //this.filterProducts();
    //console.log('Selected Category:', this.selectedCategory);
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


  getProducts(): void {
    this.appService.getProducts().subscribe(
      (response) => {
        this.products = response.sort((a: any, b: any) => a.id - b.id); 
      },
      (error) => {
        console.error('Error fetching latest products', error);
      }
    );
  }
}
