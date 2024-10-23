import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-verification.component.html',
  styleUrl: './modal-verification.component.css'
})
export class ModalVerificationComponent {
  @Input() verificationText: string = ''; 
  @Input() onButtonClick: () => void = () => {};

  constructor(public activeModal: NgbActiveModal) { }

  closeVerifModal() {
    this.activeModal.close()
  }
}
