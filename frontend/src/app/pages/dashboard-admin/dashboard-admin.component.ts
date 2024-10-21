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
    private tokenService:TokenService) {}

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
