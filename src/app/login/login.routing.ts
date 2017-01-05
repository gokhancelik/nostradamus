import { Routes, RouterModule } from '@angular/router';

import { Login } from './login.component';

// noinspection TypeScriptValidateTypes
export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    component: Login
  }
];
