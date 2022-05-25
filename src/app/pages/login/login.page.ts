import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginDisplay: boolean = false;
  signupDisplay: boolean = false;

  constructor(public route: Router) { }

  ngOnInit() {
    this.loginDisplay= true;
  }

  callLoginForm() {
    this.loginDisplay= true;
    this.signupDisplay= false;
  }
  callSignupForm() {
    this.loginDisplay= false;
    this.signupDisplay= true;
  }

  public goToHomePage() {
    this.route.navigate(['/home']);
  }
  public goToLoginPage() {
    this.route.navigate(['/login']);
  }


}
