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
  salesAux: any[] = []; //Auxiliar para los filtros
  searchedClient: string = '';
  //sortDate: number = 1;
  sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  earliestDate: any = '';
  latestDate: any = '';

  viewDetail = false; 
  selectedSale: any; 

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
      //console.log('Earliest Date changed:', event);
    } else if (type === 'latest') {
      //console.log('Latest Date changed:', event);
    }
  }

  getSales() {
    this.appService.getBranchSales().subscribe(
      (response) => {
        this.sales = response;
        this.salesAux = response;
        this.sortSales();
        //console.log(response);
      },
      (error) => {
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
    this.sortSales();
    //console.log('Selected Sort Total:', this.sortTotal);
  }

  formatTotal(sale: any): string {
    const total = Math.round(sale.total/50)*50;
    return total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getToday() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

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

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sortSales();
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