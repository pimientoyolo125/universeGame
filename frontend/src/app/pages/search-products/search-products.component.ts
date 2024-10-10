import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, FooterComponent
  ],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent implements OnInit {
  brands: { name: string; selected: boolean }[] = [
    {name:'Xbox', selected:false}, {name:'Play Station', selected:false}, {name:'Nintendo', selected:false}, 
    {name:'LG', selected:false}, {name:'Dell', selected:false}, {name:'HP', selected:false},
    {name:'Samsung', selected:false}, {name:'Panasonic', selected:false}, {name:'Sony', selected:false},
    {name:'MageWell', selected:false}, {name:'Others', selected:false}
  ];
  selectedBrands: string[] = [];
  selectedSort: number = 1; 
  selectedCategory: number = 1;

  searchString: string | null = null;
  constructor(private route: ActivatedRoute) {}

  brandSelected(brand:{ name: string; selected: boolean }) {
    brand.selected = !brand.selected 
    if (brand.selected == true) {
      if (!this.selectedBrands.includes(brand.name)) {
        this.selectedBrands.push(brand.name)
      }
    }else{
      if (this.selectedBrands.includes(brand.name)) {
        const index = this.selectedBrands.indexOf(brand.name);
        this.selectedBrands.splice(index, 1);
      }
    }
    //console.log(this.brands.filter(brand => brand.selected))
    console.log(this.selectedBrands)
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    this.selectedSort = +selectElement.value;
    //console.log('Selected Sort:', this.selectedSort);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    this.selectedCategory = +selectElement.value; 
    //console.log('Selected Category:', this.selectedCategory);
}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['q'];
      this.selectedCategory = params['c'];
    });
  }
}
