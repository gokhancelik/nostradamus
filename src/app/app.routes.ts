import { LOGIN_ROUTES } from './login/login.routing';
import { PROFILE_ROUTES } from './profile/profile.routing';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  ...LOGIN_ROUTES,
  ...PROFILE_ROUTES,
  { path: 'home', component: HomeComponent },
  { path: '**', component: NoContentComponent },
];
