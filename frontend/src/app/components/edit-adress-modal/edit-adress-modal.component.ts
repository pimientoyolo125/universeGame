import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-adress-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-adress-modal.component.html',
  styleUrl: './edit-adress-modal.component.css'
})
export class EditAdressModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  country: String = '';
  state: String = '';
  city: String = '';
  address: String = '';

  closeVerifModal() {
    this.activeModal.close()
  }
}