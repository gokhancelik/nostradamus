import { UserService } from './../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { FirebaseAuthState } from 'angularfire2';
import { EmailValidator, EqualPasswordsValidator } from './../validators';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../security/auth.service';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  template: require('./register.html'),
  styleUrls: ['../../assets/css/bootstrap-social.css']
})
export class Register {
  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public passwords: FormGroup;
  public repeatPassword: AbstractControl;
  public created: Boolean = false;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values: any): void {
    let that = this;
    this.submitted = true;
    this.authService.register(values.email,
      values.passwords.password
    ).subscribe(
      d => {
        if (d) {
          that.created = true;
        }
      }
      )
    // your code goes here
    // console.log(values);
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
  public twitterLogin(): void {
    let _that = this;
    this.authService.loginWithTwitter().subscribe(data => {
      _that.loginSuccess(data, _that);
    });
  }
  loginSuccess(d: FirebaseAuthState, that: Register) {
    that.userService.exist(d.uid).take(1).subscribe(exist => {
      if (!exist) {
        let user: User = new User(null, d.auth.displayName, null, d.auth.email, d.auth.email, d.uid, d.auth.photoURL);
        that.userService.add(user);
      }
      that.router.navigate(['/home']);
    });
  }
}
