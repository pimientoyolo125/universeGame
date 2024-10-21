import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  constructor(private appService: AppService) {};
  
  orders: any[] = [
    {id:1, total:100000, fecha:'24/10/19 21:37', cantidadProductos:5},
    {id:2, total:250000, fecha:'24/10/19 21:42', cantidadProductos:1}
  ];

  sortDate: number = 1;
  sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  ngOnInit(): void {
  }

  onDateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortDate = +selectElement.value;
    //console.log('Selected Sort Date:', this.sortDate);
  }

  onTotalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortTotal = +selectElement.value;
    //console.log('Selected Sort Total:', this.sortTotal);
  }

  getTotal(order: any): string {
    return order.total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  get paginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}