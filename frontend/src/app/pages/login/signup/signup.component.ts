import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isPasswordVisible: boolean = false; // Estado para mostrar/ocultar la contraseña

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; // Cambiar el estado
  }
}
