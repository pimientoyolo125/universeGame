import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './order-placed.component.html',
  styleUrl: './order-placed.component.css'
})
export class OrderPlacedComponent {

  constructor(private router: Router, private route: ActivatedRoute,
    private tokenService: TokenService) {
    this.tokenService.isAuthenticated().subscribe(
      (isAuth) => {
        if (!isAuth) {
          alert("You haven't signed in yet, please do it and try again.");
          this.router.navigate(['/login']);
        }
      }
    )
  }

  goOrderHistory() {
    this.router.navigate(['/account/orderHistory']);
  }
}