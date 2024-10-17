import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgClass],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  isPasswordVisible: boolean = false; // Estado para mostrar/ocultar la contraseña

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; // Cambiar el estado
  }
}
