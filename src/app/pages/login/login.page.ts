import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginDisplay: boolean = false;
  signupDisplay: boolean = false;

  constructor() { }

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
}
