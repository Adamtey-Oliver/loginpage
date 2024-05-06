import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/interface/aut';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: login = new login();
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  loadUsers(){
    this.http.get<any>('/assets/data.json').subscribe(
      (data: { users: User[] }) => {
      this.users = data.users;
    },
    error => {
      console.error('Errior loading users:', error)
    }
    );
  }

  onLogin() {
    const foundUser = this.users.find(user => user.EmailId === this.loginObj.EmailId && user.Password
      === this.loginObj.Password);
    if (foundUser) {
      console.log("Login Success");
      console.log("Navigating to dashboard..");
      this.router.navigateByUrl('/dashboard');

      sessionStorage.setItem('loginSuccess', 'true');
    }else{
      alert("Invalid Email or Password");
    }
  }
}

export class login{
  EmailId: string;
  Password: string;
  constructor () {
    this.EmailId = "";
    this.Password = "";
  }
}