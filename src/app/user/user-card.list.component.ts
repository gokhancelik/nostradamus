import { Observable } from 'rxjs/Observable';
import { User } from './../shared/models/user.model';
import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'user-card-list',
    template: `
    <div class="row">
        <div class="col-md-12 col-lg-6 col-sm-12" *ngFor="let u of userList">
            <user-card [user]="u"></user-card>
        </div>
    </div>
    `
})
export class UserCardListComponent implements OnInit, OnChanges {
    @Input() userList: User[];
    @Input() source: Observable<User[]>;
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges(changes) {
        let that = this;
        if (changes.source && changes.source.currentValue)
            that.source.subscribe(data => { that.userList = data; });
    }
}