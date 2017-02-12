import { ForgotPasswordComponent } from './forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Register } from './register.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, RouterModule
  ],
  declarations: [
    Register,
    ForgotPasswordComponent
  ],
  exports: [Register, ForgotPasswordComponent]
})
export class RegisterModule { }
