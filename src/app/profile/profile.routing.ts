import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
export const PROFILE_ROUTES: Routes = [
    {
        path: 'profile/:id',
        component: ProfileComponent
    }
];
