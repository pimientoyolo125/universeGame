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

  signup(): void {
    console.log("Email: ", this.regEmail, " and ", "Password: ", this.regPassword);
    console.log("Name: ", this.regName, " and ", "LastName: ", this.regLastName);
    console.log("Policies: ", this.regCheck, " and ", "RepeatedPassword:", this.regRepPassword);
  }

}
