import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [ComponentsModule],
    exports: [],
    declarations: [ProfileComponent],
    providers: [],
})
export class ProfileModule { }
