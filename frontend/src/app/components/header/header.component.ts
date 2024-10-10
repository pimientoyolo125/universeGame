import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, NgbDropdownModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  stringProduct: string = '';

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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.stringProduct = params['q'];
    });
  }
  
}

