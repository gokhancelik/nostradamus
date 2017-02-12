import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './login.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, RouterModule
  ],
  declarations: [
    Login
  ],
  exports: [Login]
})
export class LoginModule { }
