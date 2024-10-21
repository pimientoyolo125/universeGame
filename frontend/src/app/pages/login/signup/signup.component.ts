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
  auxPhoneNumber: string = '';
  regPhoneNumber: number = 0;
  regEmail: string = '';
  regPassword: string = '';
  regRepPassword: string = '';
  regCheck: boolean = false;
  isPasswordFocused: boolean = false;
  isPasswordFocused2: boolean = false;


  // aqui se va a hacer el tratamiento de los datos, 
  // para luego ser enviados al signup
  signup(): void {
    this.regName = this.getTextBeforeFirstSpace(this.regName);
    this.regLastName = this.getTextBeforeFirstSpace(this.regLastName);

    // Aquí lo que se hace es primero tomar 
    // la variable auxiliar para el número de 
    // teléfono Eliminar sus espacios luego 
    // de que se eliminara sus espacios 
    // se convierte de tipo string a tipo 
    // number
    this.auxPhoneNumber = this.auxPhoneNumber.replace(/\s+/g, '');
    this.regPhoneNumber = Number(this.auxPhoneNumber);

    this.regEmail = this.regEmail.replace(/\s+/g, '');

    this.basicVerifications();

    console.log("Email: ", this.regEmail, " and ", "Password: ", this.regPassword);
    console.log("Name: ", this.regName, " and ", "LastName: ", this.regLastName);
    console.log("Numero de telefono: ", this.regPhoneNumber);
    console.log("Policies: ", this.regCheck, " and ", "RepeatedPassword:", this.regRepPassword);
  }


  // Esta funcion, cada vez que el usuario cambie algo 
  // en el input de  password, entonces, cambia dinamicamente
  // el valor de la contraseña
  assignPasswordValue(event: any) {
    this.regPassword = event.target.value;
    // console.log(this.logPassword);
  }

  // este es lo mismo, pero, para el reepetir contraseña
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

  // lo mismo, pero, para el repetir contraseña
  onPasswordFocus2() {
    this.isPasswordFocused2 = true;
    // console.log("esta focused input contraseña")
  }


  // Esta función sirve para verificar Si un texto tiene
  //  espacios antes o despues de la primera secuencia 
  //  continúa de letras o números y si los tiene Elimina 
  //  estos espacios y, además, elimina todo el texto 
  //  que haya después del segundo espacio en blanco Y se queda 
  //  con el texto ( caracteres como letras o números ) que 
  //  haya entre estos estos espacios
  getTextBeforeFirstSpace(text: string): string {
    // Eliminar espacios iniciales
    text = text.trimStart();

    // Buscar la posición del primer espacio después del texto
    const firstSpaceIndex = text.indexOf(' ');

    // Si no hay espacios, retornar el texto completo
    if (firstSpaceIndex === -1) {
      return text;
    }

    // Retornar el texto antes del primer espacio
    return text.substring(0, firstSpaceIndex);
  }


  // esta funcion, cambia ciclicamente el valor
  // de la varaible policies, para dar a entender 
  // si el usuario aceptó o no los términos y condiciones 
  toggleCheckbox(): void {
    this.regCheck = !this.regCheck;  // Cambiar al valor contrario
  }

  // en esta funcion se hacen verificaciones básicas
  // sobre los datos del formulario y, en caso de pasar 
  // todas las verificaciones, permite realizar el login 
  // de lo contrario, muestra un pop up con las indicaciones
  // que debe seguir para corregir sus errores en el 
  // formulario
  basicVerifications() {
    this.regName;
    this.regLastName;
    
    this.regPhoneNumber;
    this.regEmail;
    this.regPassword;
    this.regRepPassword;
    this.regCheck;
    this.isPasswordFocused;
    this.isPasswordFocused2;

    if( this.regName === '' ){
      alert('Recuerde rellenar todos los campos')
    }
  }

}
