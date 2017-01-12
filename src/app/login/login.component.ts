import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { AuthService } from './../security/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  template: require('./login.html'),
  styleUrls: ['login.css']
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, public authService: AuthService, private router: Router, private userService: UserService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      let _that = this;
      this.authService.login(values.email, values.password).subscribe(data => {
        _that.loginSuccess(data, _that);
      });
      // your code goes here
      // console.log(values);
    }
  }
  public googleLogin(): void {
    let _that = this;
    this.authService.loginWithGoogle().subscribe(data => {
      _that.loginSuccess(data, _that);
    });
  }
  public facebookLogin(): void {
    let _that = this;
    this.authService.loginWthFacebook().subscribe(data => {
      _that.loginSuccess(data, _that);
    });
  }
  public tweeterLogin(): void {
    let _that = this;
    this.authService.loginWithTwitter().subscribe(data => {
      _that.loginSuccess(data, _that);
    });
  }
  loginSuccess(d: FirebaseAuthState, that: Login) {
    that.userService.getByUid(d.uid).take(1).subscribe(user => {
      if (user) {
        let user: User = new User(null, d.auth.displayName, null, d.auth.email, d.auth.email, d.uid, d.auth.photoURL);
        that.userService.add(user);
      }
    });
  }
}
