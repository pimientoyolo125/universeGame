import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, NgbDropdownModule, FormsModule,
    NgbModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  stringProduct: string = '';
  isMenuCollapsed = true;
  admin: any = {};

  constructor(private router: Router, private route: ActivatedRoute,
    private tokenService: TokenService) {
    if (this.tokenService.getUser() == null) {
      this.admin = { tipo: 1 }; //1 = User
    } else {
      this.admin = {tipo: this.tokenService.getUser()?.tipo}; //2 = Admin
      //console.log(this.tokenService.getUser())
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.stringProduct, c: 1 } });
  }

  goHome() {
    this.router.navigate(['/']); // Redirige a la ruta de inicio
  }

  goLogin() {
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

  goInventory() {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (isAuth) {
          this.router.navigate(['/manager/inventory']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stringProduct = params['q'];
    });
  }
}

