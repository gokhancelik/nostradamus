import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    RouterModule
} from '@angular/router';
import { CountDownComponent } from './countdown.component';

@NgModule({
    imports: [NgbModule.forRoot(), RouterModule, CommonModule
    ],
    exports: [CountDownComponent, NavbarComponent],
    declarations: [CountDownComponent, NavbarComponent],
    providers: [],
})
export class ComponentsModule { }
