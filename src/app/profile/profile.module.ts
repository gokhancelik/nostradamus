import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CategoryModule } from './../category/category.module';
import { UserModule } from './../user/user.module';
import { PredictionModule } from './../prediction/prediction.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [ComponentsModule, CommonModule, NgbModule, PredictionModule, UserModule, CategoryModule, RouterModule],
    exports: [],
    declarations: [ProfileComponent, SettingsComponent],
    providers: [],
})
export class ProfileModule { }
