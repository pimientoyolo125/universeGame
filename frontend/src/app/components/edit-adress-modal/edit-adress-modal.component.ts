import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-edit-adress-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-adress-modal.component.html',
  styleUrl: './edit-adress-modal.component.css'
})
export class EditAdressModalComponent {
  constructor(public activeModal: NgbActiveModal, private appService: AppService) { 
  }
  
  @Input() address!: {
    pais: string,
    region: string,
    ciudad: string,
    direccion: string
  }

  strError:String = "";

  closeVerifModal() {
    this.activeModal.close()
  }

  updateDireccion() {
    this.strError = '';
    
    const aux = {
      pais: 'Country',
      region: 'State/Region',
      ciudad: 'City',
      direccion: 'Address'
    };

    const emptyFields = (Object.keys(this.address) as Array<keyof typeof this.address>)
      .filter((key) => this.address[key].trim() === '')
      .map((key) => aux[key]);

    if (emptyFields.length > 0) {
      if (emptyFields.length > 1) {
        this.strError = `${emptyFields.join(' and ')} are empty.`;
      }else {
        this.strError = `${emptyFields.join(', ')} is empty.`;
      }
    }

    if (this.strError == '') {
      this.appService.actualizarDireccion(this.address.pais, this.address.region, 
        this.address.ciudad, this.address.direccion
      ).subscribe(
        (response) => {
          //console.log(response);
          this.activeModal.close()
        },
        (error) => {
          console.error('Error updating address', error);
        }
      );
    }
  }
}