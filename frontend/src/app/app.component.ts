import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private appService: AppService,
    private router: Router
  ) { }
  
  title = 'universeGame';

  valor: string = 'Valor antes de actualizar';

  ngOnInit() {
    this.appService.getTest().subscribe(
      (data:string) => {
      this.valor = data;
      this.valor = "Este valor fue cargado desde el backend: " + this.valor;
    },
    (error) => {
      console.log(error);
    });
  }
}
