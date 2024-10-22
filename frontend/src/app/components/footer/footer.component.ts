import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TokenService } from '../../token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router, private viewportScroller: ViewportScroller,
    private tokenService: TokenService) { }

  onSearch(categorie: number) {
    this.router.navigate(['/search'], { queryParams: { q: '', c: categorie } });
  }

  goProfile() {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          this.router.navigate(['/account/profile']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  goShoppingCart() {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          this.router.navigate(['/account/shoppingCart']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  goOrderHistory() {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          this.router.navigate(['/account/orderHistory']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }
}
