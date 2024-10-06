import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private appService: AppService
  ) { }

  title = 'universeGame';

  valor: string = 'Valor antes de actualizar';

  ngOnInit() {
    this.appService.getTest().subscribe((data:string) => {
      this.valor = data;
    });
  }
}
