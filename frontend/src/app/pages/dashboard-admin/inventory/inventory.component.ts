import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{
  constructor(private appService: AppService) {};
  
  categories: any[] = [];
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchedString: string = ' ';

  ngOnInit(): void {
    this.getCategories();
    this.getProducts(); 
  }

  selectedCategory: number = 1;
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = +selectElement.value;
    this.filterProducts();
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

  getCategories(): void {
    this.appService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  filterProducts(): void {
    this.appService.getFilteredProducts(
      this.searchedString, [], (this.selectedCategory - 1), false
    ).subscribe(
      (response) => {
        this.products = response.sort((a: any, b: any) => a.id - b.id);
      },
      (error) => {
        console.error('Error fetching filteredProducts', error);
      }
    );
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.filterProducts();
    }
  }
}
