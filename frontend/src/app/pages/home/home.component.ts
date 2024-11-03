import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductComponent } from '../../components/product/product.component';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    ProductComponent, 
    CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  latestProducts: any[] = [];
  categories: {name: string, image: string, id: number}[] = [
    {name: 'Consoles',image: 'https://i.imgur.com/XUCBkRT.jpg', id: 2},
    {name: 'Games',image: 'https://i.imgur.com/atfG77l.jpg', id: 3},
    {name: 'Controllers',image: 'https://i.imgur.com/33Pr6jn.jpg', id: 4},
    {name: 'Accesories',image: 'https://i.imgur.com/y4M5Duc.jpg', id: 5},
    {name: 'Recorders',image: 'https://i.imgur.com/82wYsSm.jpg', id: 6},
    {name: "TV's & Monitors",image: 'https://i.imgur.com/jjQtXYZ.jpg', id: 7}
  ];
  
  constructor(private router: Router, private appService: AppService) {}
  onSearch(categorie:number) {
    this.router.navigate(['/search'], { queryParams: { q: '', c:categorie } });
  }

  ngOnInit(): void {
    this.getLatestProducts(); 
  }

  getLatestProducts(): void {
    this.appService.getProducts().subscribe(
      (response) => {
        this.latestProducts = response.sort((a: any, b: any) => b.modelo - a.modelo); //Ordena de mas reciente a mas viejo
        this.latestProducts = this.latestProducts.slice(0, 12);
      },
      (error) => {
        console.error('Error fetching latest products', error);
      }
    );
  }
}
