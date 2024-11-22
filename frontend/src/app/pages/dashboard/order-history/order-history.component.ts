import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination,
    OrderDetailComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  constructor(private appService: AppService) {};
  
  orders: any[] = [];

  sortDate: number = 1;
  searchedProduct: string = '';
  //sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  viewDetail = false; 
  selectedOrder: any; 

  isLoading: boolean = true;

  ngOnInit(): void {
    this.getOrders();
  }

  onDateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortDate = +selectElement.value;
    this.getOrders()
    //console.log('Selected Sort Date:', this.sortDate);
  }

  /* Se descarto mas adelante en el desarrollo
  onTotalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortTotal = +selectElement.value;
    this.sortOrders();
    //console.log('Selected Sort Total:', this.sortTotal);
  }
  */

  getOrders() {
    this.isLoading = true;

    //Se vacian para que se muestre el Loading... cada vez que se actualicen 
    //los parametros de los filtros
    this.orders = []; 

    this.appService.getUserOrders(this.searchedProduct, this.sortDate === 1).subscribe(
      (response) => {
        this.orders = response;
        this.isLoading = false;
        //console.log(response);
      },
      (error) => {
        console.error('Error Loading the user Orders', error);
        this.isLoading = false;
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Extraer componentes de fecha y hora
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Formato deseado: YYYY/MM/DD HH:MM
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  formatTotal(order: any): string {
    const total = Math.round(order.total/50)*50;
    return total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  //Ahora se hace desde el back
  /*
  sortOrders(){
    //console.log(this.orders);
    if (this.sortDate == 1) {
      //Mas nuevo a mas viejo 
      this.orders.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());  
    } else {
      this.orders.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }
  }
  */

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.getOrders()
    }
  }

  get paginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  showOrderDetail(order: any) {
    this.selectedOrder = order;
    this.viewDetail = true;
  }
}