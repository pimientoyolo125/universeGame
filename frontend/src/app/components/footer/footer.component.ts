import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  onSearch(categorie:number) {
    this.router.navigate(['/search'], { queryParams: { q: '', c:categorie } });
    
  }
}
