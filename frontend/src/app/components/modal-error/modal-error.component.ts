import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})
export class ModalErrorComponent {

  @Input() errorList: string[] = [];  // Recibir la lista de textos desde otro componente

  constructor(public activeModal: NgbActiveModal) { }

  // esta función cierra el modal de error
  closeErrorModal() {
    this.activeModal.close()
  }

}
