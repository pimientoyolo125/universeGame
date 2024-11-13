import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  constructor(private router: Router, private route: ActivatedRoute, 
    private tokenService:TokenService) {
      this.tokenService.isAuthenticated().subscribe(
        (isAuth) => {
          if (!isAuth) {
            alert("You haven't signed in yet, please do it and try again.");
            this.router.navigate(['/login']);
          }
        }
      )
      //Verificamos que solo los admins accedan a esta ruta
      if (this.tokenService.getUser()?.tipo == 1) {
        this.router.navigate(['/']);
      }
    }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
