import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAdressModalComponent } from '../../../components/edit-adress-modal/edit-adress-modal.component';
import { TokenService } from '../../../token.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditAdressModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private appService: AppService, private modalService:NgbModal,
  private tokenService:TokenService) {};

  direccion: any = {
    "pais": "N.A",
    "region": "N.A",
    "ciudad": "N.A",
    "direccion": "N.A"
  };

  user: any = {
    "nombre": "N.A",
    "telefono": "N.A",
    "Correo": "N.A"
  }

  ngOnInit(): void {
    this.getDireccion();
    this.getUser();
  }

  getDireccion(): void { 
    this.appService.getDireccion().subscribe(
      (response) => {
        this.direccion = response;
        //console.log(response);
      },
      (error) => {
        console.clear();
        //console.error('Error fetching address', error);
      }
    );
  }

  getUser(): void { 
    this.appService.getUserInfo().subscribe(
      (response) => {
        this.user = response;
        this.user.correo = this.tokenService.getUser()?.correo;
        //console.log(this.user)
      },
      (error) => {
        console.log("There was an error getting your account info")
      }
    );
  }

  editAdressModal() {
    const modalRef = this.modalService.open(EditAdressModalComponent);
    
    //Generamos una copia de this.direccion para que sean "independientes"
    modalRef.componentInstance.address = JSON.parse(JSON.stringify(this.direccion));
    
    //Cuando se cierre, verificamos la actualización trayendo nuevamente los
    //datos de la DB
    modalRef.closed.subscribe(() => {
      this.getDireccion();
    });
  }
}