import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppService } from '../../app.service';
import { ProductComponent } from '../../components/product/product.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

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
  brands: { name: string; selected: boolean }[] = [
    {name:'Xbox', selected:false}, {name:'Sony', selected:false}, {name:'Nintendo', selected:false}, 
    {name:'Elgato', selected:false}, {name:'Acer', selected:false}, {name:'Microsoft', selected:false},
    {name:'AVerMedia', selected:false}, {name:'LG', selected:false}, {name:'Samsung', selected:false},
    {name:'Others', selected:false}
  ];

  otherBrands = [
    "Razer", "Atlus", "Rybozen", "8bitdo", "Tatybo", "ConcernedApe", "Hauppauge",
    "SanDisk", "Voyee", "PerfectSight", "Gigastone", "Younik", "Purbhe", "ZedLabz", "Valve",
    "Amazon Basics", "Subang", "Allnice", "Supergiant Games","Konami" 
  ];

  categories = [{name: 'Consoles', id:2 }, {name: 'Games', id:3 }, {name: 'Controllers', id:4 }, 
    {name: 'Accessories', id:5 }, {name: 'Recorders', id:6 }, {name: "TV's & Monitors", id:7 }
  ];

  selectedBrands: string[] = [];
  selectedSort: number = 1; 
  selectedCategory: number = 1;
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  searchString: string | null = null;
  constructor(private route: ActivatedRoute, private appService: AppService) {}

  brandSelected(brand:{ name: string; selected: boolean }): void {
    brand.selected = !brand.selected 
    if (brand.selected == true) {
      if (!this.selectedBrands.includes(brand.name)) {
        this.selectedBrands.push(brand.name)
        if (brand.name == 'Others') {
          this.selectedBrands = this.selectedBrands.concat(this.otherBrands);
        }
        this.filterProducts();
      }
    }else{
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
    //console.log('Selected Sort:', this.selectedSort);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    this.selectedCategory = +selectElement.value; 
    this.filterProducts();
    //console.log('Selected Category:', this.selectedCategory);
}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['q'];
      this.selectedCategory = params['c'];
      this.getProducts();
    });
  }

  getProducts(): void {
    this.appService.getProducts().subscribe(
      (response) => {
        this.products = response.sort((a: any, b: any) => b.modelo - a.modelo); //Ordena de mas reciente a mas viejo
        this.filterProducts();
      },
      (error) => {
        console.error('Error fetching Products', error);
      }
    );
  }

  filterProducts(): void {
    if (this.searchString == undefined || this.searchString == "" || this.searchString == " " ) {
      if (this.selectedBrands.length > 0) {
        this.filteredProducts = this.products.filter(product => this.selectedBrands.includes(product.marca));
      }
      else{
        this.filteredProducts = [...this.products];
      }

      if (this.selectedCategory != 1) {
        var selectedCategoryName = this.categories.find(category => category.id == this.selectedCategory)?.name;
        this.filteredProducts= this.filteredProducts.filter(product => product.tipoProducto.nombre === selectedCategoryName);
      }

      if (this.selectedSort == 2) {
        this.filteredProducts  = this.filteredProducts.sort((a: any, b: any) => a.modelo - b.modelo)
      }
      //console.log(String(this.filteredProducts.length));
    }
    else{
      //Filtramos por el nombre:
      this.filteredProducts = this.products.filter(product => product.nombre.toLowerCase().
      includes(this.searchString?.toLocaleLowerCase().trim()));

      if (this.filteredProducts.length === 0) {
        return;
      }

      if (this.selectedBrands.length > 0) {
        this.filteredProducts = this.filteredProducts.filter(product => this.selectedBrands.includes(product.marca));
      }

      if (this.selectedCategory != 1) {
        const selectedCategoryName = this.categories.find(category => category.id == this.selectedCategory)?.name;
        this.filteredProducts= this.filteredProducts.filter(product => product.tipoProducto.nombre === selectedCategoryName);
      }

      if (this.selectedSort == 2) {
        this.filteredProducts  = this.filteredProducts.sort((a: any, b: any) => a.modelo - b.modelo)
      }
      //console.log(String(this.filteredProducts.length));
    }
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}