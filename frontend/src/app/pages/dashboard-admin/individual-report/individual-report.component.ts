import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbPagination, NgbAlertModule, NgbDatepickerModule, NgbCalendar, NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-individual-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, NgbDatepickerModule, NgbAlertModule, 
    FormsModule, JsonPipe],
  templateUrl: './individual-report.component.html',
  styleUrl: './individual-report.component.css'
})
export class IndividualReportComponent implements OnInit{
  constructor(private appService: AppService, private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>) {};
  
  sales: any[] = [
    {id:1, total:10000000, fecha:'24/10/19 21:37', comprador:'John Doe', cantidadProductos:5},
    {id:2, total:250000, fecha:'24/10/19 21:42', comprador:'Michael Jordan', cantidadProductos:1}
  ];

  sortDate: number = 1;
  sortTotal: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  earliestDate: any = '';
  latestDate: any = '';

  ngOnInit(): void {
    this.earliestDate = this.getToday();
    this.latestDate = this.getToday();
  }

  onSortDateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortDate = +selectElement.value;
    //console.log('Selected Sort Date:', this.sortDate);
  }

  onDateChange(type: string, event: any) {
    if (type === 'earliest') {
      //console.log('Earliest Date changed:', event);
    } else if (type === 'latest') {
      //console.log('Latest Date changed:', event);
    }
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

  get paginatedSales() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sales.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
