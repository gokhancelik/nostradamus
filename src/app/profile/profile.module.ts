import { PredictionModule } from './../prediction/prediction.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [ComponentsModule, CommonModule, NgbModule, PredictionModule],
    exports: [],
    declarations: [ProfileComponent],
    providers: [],
})
export class ProfileModule { }
