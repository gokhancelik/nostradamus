import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';

import { Register } from './register.component';

// noinspection TypeScriptValidateTypes
export const REGISTER_ROUTES = [
  {
    path: 'register',
    component: Register
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  }
];
