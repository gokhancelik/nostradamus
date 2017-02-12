import { AuthService } from './../security/auth.service';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailValidator } from './../validators/email.validator';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'forgot-password',
    templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    public form: FormGroup;
    public email: AbstractControl;
    public sended: boolean;
    constructor(fb: FormBuilder, private authService: AuthService) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])]

        });
        this.email = this.form.controls['email'];
    }

    ngOnInit() { }
    public onSubmit(values: any): void {
        let that = this;
        this.authService.resetPassword(values.email
        ).subscribe(
            d => {
                if (d) {
                    that.sended = true;
                }
            }
            )
        // your code goes here
        // console.log(values);
    }
}