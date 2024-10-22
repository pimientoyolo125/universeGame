import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { TokenService } from '../../../token.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../../../components/modal-error/modal-error.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {


  isPasswordVisible: boolean = false;
  logPassword: string = '';
  logEmail: string = '';
  error: string = '';
  isPasswordFocused: boolean = false;
  isEmailFocused: boolean = false;
  isLoading: boolean = false;


  constructor(
    private appService: AppService,
    private tokenService: TokenService,
    private router: Router,
    // esto es para construir el servicio que va a desplagar el modal
    private modalService: NgbModal

  ) { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  assignPasswordValue(event: any) {
    this.logPassword = event.target.value;
    //console.log(this.logPassword);
  }

  onPasswordFocus() {
    this.isPasswordFocused = true;
    this.error = '';
    //console.log("esta focused input contraseña")
  }

  onEmailFocus() {
    this.isEmailFocused = true;
    this.error = '';
    //console.log("esta focused input contraseña")
  }

  login(): void {
    //console.log("Email: ", this.logEmail, " and ", "Password: ", this.logPassword);
    this.logEmail = this.logEmail.replace(/\s+/g, '');

    const isThereError = this.basicVerifications();

    if( isThereError ){ return; }
    

    this.isLoading = true;

    this.appService.login(
      this.logEmail.trim(), this.logPassword.trim()
    ).subscribe(
      (response) => {
        if (response.message == 'Successful login') {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/']);
          //console.log(this.tokenService.getToken());
        }
      },
      (error) => {
        console.error('Error fetching filteredProducts', error);
        this.error = error.error.message;
      }
    );

    this.isLoading = false; 
  }


  // esta funcion hace verificaciones sencillas 
  // sobre los campos en el form. esto para que 
  // el usuario no se ponga a poner marikdas en 
  // los campos
  basicVerifications() : boolean {

    let isThereError: boolean = false;
    this.logPassword;
    this.logEmail;

    let listaDeErrores: string[] = [];
    let auxString = '';

    auxString += (this.logEmail === '') ? "E-mail, " : "";
    auxString += (this.logPassword === '') ? "Password, " : "";

    if (auxString.length > 0) {
      auxString = auxString.slice(0, -2);

      listaDeErrores.push("Please complete the following fields: " + auxString);
    }


    // ============== verificar si la contraseña tiene 8 caracteres o menos ============== 
    (this.logPassword.length <= 8) ? listaDeErrores.push("Password must be more than 8 characters long") : null;

    if(listaDeErrores.length > 0){
      isThereError = true;
      this.openErrorModal(listaDeErrores)
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