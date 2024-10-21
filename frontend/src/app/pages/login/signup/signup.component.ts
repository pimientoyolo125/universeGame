import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  regName: string = '';
  regLastName: string = '';
  regEmail: string = '';
  regPassword: string = '';
  regRepPassword: string = '';
  regCheck: boolean = false;
  isPasswordFocused: boolean = false;
  isPasswordFocused2: boolean = false;


  signup(): void {
    console.log("Email: ", this.regEmail, " and ", "Password: ", this.regPassword);
    console.log("Name: ", this.regName, " and ", "LastName: ", this.regLastName);
    console.log("Policies: ", this.regCheck, " and ", "RepeatedPassword:", this.regRepPassword);
  }


  // Esta funcion, cada vez que el usuario cambie algo 
  // en el input de  password, entonces, cambia dinamicamente
  // el valor de la contraseña
  assignPasswordValue(event: any) {
    this.regPassword = event.target.value;
    // console.log(this.logPassword);
  }

  assignPasswordValue2(event: any) {
    this.regRepPassword = event.target.value;
    // console.log(this.logPassword);
  }

  // Esta funcion lo que hace es poner en true
  // una variable, cuando, el input field de la contraseña esté
  // focusado (se hizo click sobre él). Esto ayuda a manejar la 
  // visibilidad del <p> que se usa para informar sobre la longitud
  // que debe tener la contraseña
  onPasswordFocus() {
    this.isPasswordFocused = true;
    // console.log("esta focused input contraseña")
  }

  onPasswordFocus2() {
    this.isPasswordFocused2 = true;
    // console.log("esta focused input contraseña")
  }


}
