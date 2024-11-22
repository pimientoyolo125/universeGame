import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbPagination, NgbAlertModule, NgbDatepickerModule, NgbCalendar, NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

@Component({
  selector: 'app-individual-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, NgbDatepickerModule, NgbAlertModule, 
    FormsModule, JsonPipe, OrderDetailComponent],
  templateUrl: './individual-report.component.html',
  styleUrl: './individual-report.component.css'
})
export class IndividualReportComponent implements OnInit{
  constructor(private appService: AppService, private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>) {};
  
  sales: any[] = [];
  searchedClient: string = '';
  //sortDate: number = 1;
  sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  earliestDate: any = {};
  latestDate: any = {};

  viewDetail = false; 
  selectedSale: any; 

  isLoading: boolean = true;

  ngOnInit(): void {
    this.earliestDate = this.getToday();
    this.latestDate = this.getToday();
    this.getSales();
  }

  /*
  onSortDateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortDate = +selectElement.value;
    //console.log('Selected Sort Date:', this.sortDate);
  }
  */

  onDateChange(type: string, event: any) {
    if (type === 'earliest') {
      //Verificamos que la nueva fecha no sea despues de hoy
      if (this.convertObjectToDate(this.earliestDate) > this.convertObjectToDate(this.getToday())) {
        alert("There are not sales reports in the FUTURE!");

        if (this.convertObjectToDate(this.getToday()) > this.convertObjectToDate(this.latestDate)) {
          //Se igualan las fechas
          this.earliestDate = this.latestDate;
        }else {
          this.earliestDate = this.getToday();
        }

        //Como cambio la fecha actualizamos las ventas
        this.getSales();
        return;
      } 
      
      //Verificamos que la nueva fecha no sea despues del limite superior del rango
      if (this.convertObjectToDate(this.earliestDate) > this.convertObjectToDate(this.latestDate)) {
        alert("Please select a valid Date Range!")
        
        if (this.convertObjectToDate(this.getToday()) > this.convertObjectToDate(this.latestDate)) {
          //Se igualan las fechas
          this.earliestDate = this.latestDate;
        }else {
          this.earliestDate = this.getToday();
        }
        
        //Como cambio la fecha actualizamos las ventas
        this.getSales();
        return;
      }

      //Si las fechas son validas actualice las ventas:
      this.getSales();

      //console.log('Earliest Date changed:', event);

    } else if (type === 'latest') {
      //Verificamos que la nueva fecha no sea despues de hoy
      if (this.convertObjectToDate(this.latestDate) > this.convertObjectToDate(this.getToday())) {
        alert("There are not sales reports in the FUTURE!");
        this.latestDate = this.getToday();

        //Como cambio la fecha actualizamos las ventas
        this.getSales();
        return;
      }

      //Verificamos que la nueva fecha no sea despues del limite superior del rango
      if (this.convertObjectToDate(this.earliestDate) > this.convertObjectToDate(this.latestDate)) {
        alert("Please select a valid Date Range!")
        this.latestDate = this.getToday();

        //Como cambio la fecha actualizamos las ventas
        this.getSales();
        return;
      }

      //Si las fechas son validas actualice las ventas:
      this.getSales();

      //console.log('Latest Date changed:', event);
    }
  }

  convertObjectToDate(object: any){
    return new Date(object.year, object.month - 1, object.day);
  }

  getSales() {
    //Reiniciar el arreglo que contiene las ventas para solo mostar el loading
    this.sales = []
    this.isLoading = true;

    //Auxiliares para pasar las fechas en los rangos correctos
    const fechaInf = `${this.earliestDate.year}-${this.earliestDate.month}-${this.earliestDate.day}`
    const fechaSup = `${this.latestDate.year}-${this.latestDate.month}-${this.latestDate.day}`
    
    this.appService.getBranchSales(
      this.searchedClient, fechaInf, fechaSup, this.sortTotal === 1
    ).subscribe(
      (response) => {
        this.sales = response;
        this.isLoading = false;
        //console.log(response);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error Loading the user Orders', error);
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

  onTotalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortTotal = +selectElement.value;
    this.getSales();
    //console.log('Selected Sort Total:', this.sortTotal);
  }

  formatTotal(sale: any): string {
    const total = Math.round(sale.total/50)*50;
    return total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getToday() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  /* Se hace desde el Backend
  sortSales(){
    this.sales = this.salesAux; //"Reinicia" los filtros del cliente
    if (this.searchedClient.trim() != '') {
      this.sales = this.sales.filter((sale: any) => {
        const nombreCompleto = sale.usuario.nombre + " " + sale.usuario.apellido;
        return nombreCompleto.includes(this.searchedClient.toUpperCase());
      });
    }

    if (this.sortTotal == 1) {
      this.sales.sort((a: any, b: any) => b.total - a.total);  //Mas grande a mas pequeña
    } else {
      this.sales.sort((a: any, b: any) => a.total - b.total);
    }
  }
  */

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.getSales();
    }
  }

  get paginatedSales() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sales.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  showSaleDetail(sale: any) {
    this.selectedSale = sale;
    this.viewDetail = true;
  }
}