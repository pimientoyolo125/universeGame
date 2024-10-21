import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})
export class ModalErrorComponent {


  constructor(public activeModal: NgbActiveModal) { }

  // esta función cierra el modal de error
  closeErrorModal() {
    this.activeModal.close()
  }

}
