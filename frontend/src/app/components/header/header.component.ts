import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, NgbDropdownModule, FormsModule,
    NgbModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  stringProduct: string = '';
  admin: boolean = true; //Temporal Mientras terminamos el Login
  isMenuCollapsed = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.stringProduct, c:1} });
  }

  goHome() {
    this.router.navigate(['/']); // Redirige a la ruta de inicio
  }

  goLogin() {
    this.router.navigate(['/login']); 
  }

  goShoppingCart() {
    this.router.navigate(['/account/shoppingCart']); 
  }

  goOrderHistory() {
    this.router.navigate(['/account/orderHistory']); 
  }

  goInventory() {
    this.router.navigate(['/manager/inventory']); 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stringProduct = params['q'];
    });
  }
  
}

