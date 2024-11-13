import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbPagination, NgbAlertModule, NgbDatepickerModule, NgbCalendar, NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

@Component({
  selector: 'app-joint-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, NgbDatepickerModule, NgbAlertModule, 
    FormsModule, JsonPipe, OrderDetailComponent],
  templateUrl: './joint-report.component.html',
  styleUrl: './joint-report.component.css'
})
export class JointReportComponent implements OnInit{
  constructor(private appService: AppService, private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>) {};
  
  sales: any[] = [
    {id:1, total:100000000, fecha:'24/10/19 21:37', comprador:'John Doe', sucursal:'UniverseGames', cantidadProductos:5},
    {id:2, total:250000, fecha:'24/10/19 21:42', comprador:'Michael Jordan', sucursal:'CandyStoreX', cantidadProductos:1}
  ];

  branches: any[] = [
    {location:'UniverseGames', selected:false},
    {location:'CandyStoreX', selected:false},
  ]

  //sortDate: number = 1;
  searchedClient: string = '';
  sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  earliestDate: any = '';
  latestDate: any = '';

  viewDetail = false; 
  selectedSale: any; 

  isLoading: boolean = true;

  ngOnInit(): void {
    this.earliestDate = this.getToday();
    this.latestDate = this.getToday();
    this.isLoading = false;
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
        this.earliestDate = this.getToday();
        return;
      } 
      
      //Verificamos que la nueva fecha no sea despues del limite superior del rango
      if (this.convertObjectToDate(this.earliestDate) > this.convertObjectToDate(this.latestDate)) {
        alert("Please select a valid Date Range!")
        this.earliestDate = this.getToday();
      }
      //console.log('Earliest Date changed:', event);

    } else if (type === 'latest') {
      //Verificamos que la nueva fecha no sea despues de hoy
      if (this.convertObjectToDate(this.latestDate) > this.convertObjectToDate(this.getToday())) {
        alert("There are not sales reports in the FUTURE!");
        this.latestDate = this.getToday();
        return;
      }

      //Verificamos que la nueva fecha no sea despues del limite superior del rango
      if (this.convertObjectToDate(this.earliestDate) > this.convertObjectToDate(this.latestDate)) {
        alert("Please select a valid Date Range!")
        this.latestDate = this.getToday();
      }
      
      //console.log('Latest Date changed:', event);
    }
  }

  convertObjectToDate(object: any){
    return new Date(object.year, object.month - 1, object.day);
  }


  onBranchChange(event: Event) {
    console.log(this.branches.filter(branch => branch.selected));
    //console.log('Selected Sort Date:', this.sortDate);
  }

  onTotalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortTotal = +selectElement.value;
    //console.log('Selected Sort Total:', this.sortTotal);
  }

  getTotal(sale: any): string {
    return sale.total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  getToday() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      //this.sortSales();
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