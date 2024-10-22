import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalErrorComponent } from '../../../components/modal-error/modal-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // esto es para construir el servicio que va a desplagar el modal
  constructor(private modalService: NgbModal) { }

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
  isLoading: boolean = false;


  // aqui se va a hacer el tratamiento de los datos, 
  // para luego ser enviados al signup
  signup(): void {

    this.isLoading = true;

    this.regName = this.getTextBeforeFirstSpace(this.regName);
    this.regLastName = this.getTextBeforeFirstSpace(this.regLastName);


    this.auxPhoneNumber = this.auxPhoneNumber.replace(/\s+/g, ''); // Aquí lo que se hace es primero tomar 
    // la variable auxiliar para el número de 
    // teléfono Eliminar sus espacios luego 
    // de que se eliminara sus espacios 
    // se convierte de tipo string a tipo 
    // number
    this.regPhoneNumber = Number(this.auxPhoneNumber);

    this.regEmail = this.regEmail.replace(/\s+/g, ''); // más de lo mismo: reemplazar espacios

    const isThereError = this.basicVerifications();

    if( isThereError ){
      this.isLoading = false;
      return;
    }

    console.log("Email: ", this.regEmail, " and ", "Password: ", this.regPassword);
    console.log("Name: ", this.regName, " and ", "LastName: ", this.regLastName);
    console.log("Numero de telefono: ", this.regPhoneNumber);
    console.log("Policies: ", this.regCheck, " and ", "RepeatedPassword:", this.regRepPassword);

    // fingimos algun proceso asincrono
    setTimeout(() => {
      this.isLoading = false; // Cuando termine la carga, se oculta el <p>
    }, 5000);
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
  basicVerifications(): boolean {

    let isThereError: boolean = false;
    let errorMessages: string[] = [];
    let auxString: string = '';

    // ==================== seccion que chequea que no falte nigun valor ====================

    // aqui hay condiciones consecutivas que, cuando
    //  se cumplen, añaden el nombre de un campo 
    //  del forms al string auxiliar, esto generando 
    //  un string que contienen todos esos campos 
    //  que le falta al usuario, para luego darle 
    //  feedback de que tiene que rellenar estos 
    //  campos faltantes
    auxString += (this.regName === '') ? "Name, " : "";
    auxString += (this.regLastName === '') ? "Last Name, " : "";
    auxString += (this.regPhoneNumber === 0) ? "Telephone number, " : "";
    auxString += (this.regEmail === '') ? "E-mail, " : "";
    auxString += (this.regPassword === '') ? "Password, " : "";
    auxString += (this.regRepPassword === '') ? "Confirm password, " : "";


    //  esto es una version abreviada de un if que, 
    //  en caso de que la longitud del string auxiliar 
    //  donde se almacenan los campos que faltan en 
    //  el form sea mayor que 0, entonces, se insesrta 
    //  en la primera posicion de la lista de strings 
    //  con los errores el string que informa que 
    //  faltan varios campos en el formulario, diciendo
    //   así: "faltan los siguientes campos: nombre,
    //    numero, etc."
    if (auxString.length > 0) {
      auxString = auxString.slice(0, -2)
      errorMessages.push("The following fields are empty: " + auxString)
    }

    // ==================== el phone numer es un número válido? ====================

    //  si regPhoneNumber no es un número o si
    //   tiene más de 10 dígitos, entonces, lanza 
    //   un error
    (isNaN(this.regPhoneNumber) || this.regPhoneNumber.toString().length !== 10 ) ? errorMessages.push("Phone number must be a 10 digits number") : null;


    // ==================== se repitió la contraseña 2 veces? ====================
    (this.regPassword !== this.regRepPassword) ? errorMessages.push("Confirm password must be the same as password") : null;


    // ============ la contraseña y confirmar contraseña tiene más de 8 caracteres ============
    (this.regPassword.length <= 8) ? errorMessages.push("Password must be more than 8 characters long") : null;
    (this.regRepPassword.length <= 8) ? errorMessages.push("Confirm password must be more than 8 characters long") : null;

    // ================== Comprobar si se aceptaron los TyC ==================
    ( !this.regCheck ) ? errorMessages.push("Please accept Terms and Conditions") : null;

    //  Finalmente, si hubo algun error, entonces, 
    //  se registró como un string en la lista de 
    //  strings que dan feedback sobre los errores 
    //  en el formatCurrency, por tanto, si hay 
    //  algun string dentro de la Lista, se abre 
    //  el modal que informa de los errores
    if (errorMessages.length > 0) {

      isThereError = true;
      this.openErrorModal(errorMessages);

    }


    return isThereError;
  }

  // esta funcion abre el modal de error. el 
  // punto es que pasa una lista la cual tiene 
  // los errores que el usuario cometió y, el 
  // punto es crear ese modal, usando como 
  // parametro la lista de errores, para mostrarle 
  // feedback al usuario de qué es lo que 
  // tiene que corregir
  openErrorModal(listOfErrorMessages: string[]) {

    const modalRef = this.modalService.open(ModalErrorComponent);
    modalRef.componentInstance.errorList = listOfErrorMessages;  // Pasar la lista de errores

  }
}
