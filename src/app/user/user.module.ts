import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserSmallCardComponent } from './user-small-card.component';
import { UserCardListComponent } from './user-card.list.component';
import { UserCardComponent } from './user-card.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, NgbModule, RouterModule],
    exports: [UserCardComponent, UserCardListComponent, UserSmallCardComponent],
    declarations: [UserCardComponent, UserCardListComponent, UserSmallCardComponent],
    providers: [],
})
export class UserModule { }
