import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppService } from '../../app.service';
import { ProductComponent } from '../../components/product/product.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, FooterComponent, ProductComponent, NgbPagination
  ],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private appService: AppService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['q'];
      this.selectedCategory = params['c'];
      this.getBrands();
      this.getCategories();
      this.filterProducts();
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  searchString: string = '';
  products: any[] = [];
  brands: any[] = [];
  otherBrands: string[] = [];
  categories: any[] = [];

  selectedBrands: string[] = [];
  selectedSort: number = 1;
  selectedCategory: number = 1;

  currentPage: number = 1;
  itemsPerPage: number = 8;

  brandSelected(brand: { name: string; selected: boolean }): void {
    brand.selected = !brand.selected
    if (brand.selected == true) {
      if (!this.selectedBrands.includes(brand.name)) {
        this.selectedBrands.push(brand.name)
        if (brand.name == 'Others') {
          this.selectedBrands = this.selectedBrands.concat(this.otherBrands);
        }
        this.filterProducts();
      }
    } else {
      if (this.selectedBrands.includes(brand.name)) {
        const index = this.selectedBrands.indexOf(brand.name);
        this.selectedBrands.splice(index, 1);
        if (brand.name == 'Others') {
          this.selectedBrands = this.selectedBrands.filter(brand => !this.otherBrands.includes(brand));
        }
        this.filterProducts();
      }
    }
    //console.log(this.brands.filter(brand => brand.selected))
    //console.log(this.selectedBrands)
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    this.selectedSort = +selectElement.value;
    this.filterProducts();
    console.log('Selected Sort:', this.selectedSort);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = +selectElement.value;
    this.filterProducts();
    //console.log('Selected Category:', this.selectedCategory);
  }

  getBrands(): void {
    this.appService.getBrands().subscribe(
      (response) => {
        this.brands = response.slice(0, 9).map((brand: any) => ({
          name: brand,
          selected: false
        }));
        this.brands = this.brands.concat({ name: 'Others', selected: false });
        this.otherBrands = response.slice(9, response.length);
      },
      (error) => {
        console.error('Error fetching Products', error);
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
      this.searchString, this.selectedBrands, (this.selectedCategory - 1), this.selectedSort==2
    ).subscribe(
      (response) => {
        this.products = response
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
}