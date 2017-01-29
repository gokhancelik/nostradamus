import { UserEditComponent } from './../user/user-edit.component';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
export const PROFILE_ROUTES: Routes = [
    {
        path: 'profile/:id',
        component: ProfileComponent
    },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [{
            path: 'editProfile',
            component: UserEditComponent
        }]
    }

];
