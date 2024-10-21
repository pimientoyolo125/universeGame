import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { TokenService } from '../../../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  isPasswordVisible: boolean = false; 
  errPassword: string = '';
  errEmail: string = '';

  constructor(
    private appService: AppService,
    private tokenService:TokenService,
    private router:Router
  ) { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; 
  }
  
  logPassword: string = '';
  logEmail: string = '';

  login(): void {
    console.log("Email: ", this.logEmail, " and ", "Password: ", this.logPassword);
    this.appService.login(
      this.logEmail.trim(), this.logPassword.trim()
    ).subscribe(
      (response) => {
        if (response.message == 'Successful login') {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/']); 
          //console.log(this.tokenService.getToken());
        }
        else{
          //this.errPassword = 'response.error.message';
          console.log(this.errPassword);  
        }
      },
      (error) => {
        console.error('Error fetching filteredProducts', error);
      }
    );
  }
}