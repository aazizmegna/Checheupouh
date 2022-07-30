import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginDisplay: boolean = false;
  signupDisplay: boolean = false;
  btnFormLogin: boolean = true;
  btnFormSignup: boolean = true;
  loginColor:string ='oldlace';
  signupColor:string ='white';

  constructor(public route: Router) { }

  ngOnInit() {
    this.loginDisplay= true;
  }

  callLoginForm() {
    this.loginDisplay= true;
    this.signupDisplay= false;
    this.loginColor = 'oldlace'
    this.signupColor = 'white'

  }
  callSignupForm() {
    this.loginDisplay= false;
    this.signupDisplay= true;
    this.loginColor = 'white'
    this.signupColor = 'oldlace'

  }

  public goToHomePage() {
    this.route.navigate(['/home']);
  }
  public goToLoginPage() {
    this.route.navigate(['/login']);
  }






// Cognito
toVerifyEmail: boolean = false;
userName: string;


singUpToAWS(name: HTMLInputElement,username: HTMLInputElement,password: HTMLInputElement) {
  
  this.userName = username.value;

  const user = {
    username: username.value,
    password: password.value,
    attributes: {
        name: name.value,          // optional
        //phone_number: contactNo.value,   // optional - E.164 number convention
        // other custom attributes 
    }
  }

   
  Auth.signUp(user)
    .then(data => {
      console.log(data);
      this.loginDisplay= false;
      this.signupDisplay= false;
      this.btnFormLogin = false;
      this.btnFormSignup = false;
      this.toVerifyEmail = true;

    })
    .catch(err => console.log(err));

// Auth.resendSignUp(username).then(() => {
//     console.log('code resent successfully');
// }).catch(e => {
//     console.log(e);
// });

}

onVerify(verifycode: HTMLInputElement) {
  // After retrieving the confirmation code from the user
  Auth.confirmSignUp(this.userName, verifycode.value, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true    
    }).then(data => {
      console.log(data)
      this.toVerifyEmail = false;
      this.signupDisplay= false;
      this.loginDisplay= true;
      this.btnFormLogin= true;
      this.btnFormSignup= true;
      this.loginColor = 'oldlace'
      this.signupColor = 'white'
    })
      .catch(err => console.log(err));
}

signInToAWS(email: HTMLInputElement, password: HTMLInputElement ) {

  const authInfo = {
    username: email.value,
    password: password.value
  }

  Auth.signIn(authInfo).then(user => {
    console.log(user);
    this.route.navigate(['/home'])
  })
    .catch(err => console.log(err));

}


async facebookLogin() {
  await Auth.federatedSignIn({customProvider: 'Facebook'});
}

async googleLogin() {
  await Auth.federatedSignIn({customProvider: 'Google'});
}


//Cognito end





}
