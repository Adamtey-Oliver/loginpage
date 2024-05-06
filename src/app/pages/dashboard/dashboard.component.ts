import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@app/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  loginSuccess: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    const storedLoginSuccess = sessionStorage.getItem('loginSuccess');

   if (storedLoginSuccess) {
    this.loginSuccess = sessionStorage.getItem('loginSuccess') === 'true';
    sessionStorage.removeItem('loginSuccess');
   }
  }

  login(){
    console.log('Login method called. Setting loginSuccess to true.');
    this.loginSuccess = true;

    setTimeout(() => {
      console.log('Timeout executed. Setting loginSuccess to false.');
      this.loginSuccess = false;
    }, 3000);
  }
}
