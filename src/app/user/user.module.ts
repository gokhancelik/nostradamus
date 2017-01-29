import { FormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserSmallCardComponent } from './user-small-card.component';
import { UserCardListComponent } from './user-card.list.component';
import { UserCardComponent } from './user-card.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, NgbModule, RouterModule, FormsModule],
    exports: [UserCardComponent, UserCardListComponent, UserSmallCardComponent, UserEditComponent],
    declarations: [UserCardComponent, UserCardListComponent, UserSmallCardComponent, UserEditComponent],
    providers: [],
})
export class UserModule { }
