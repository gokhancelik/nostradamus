import { User } from './../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'user-small-card',
    template: `
      <div class="row">
      <div class="col-xs-2">
        <img *ngIf="user?.photoUrl" class="rounded float-left img-fluid"  [src]="user.photoUrl"
          alt="Profile image">
      </div>
      <div class="col-xs-10">
        <a href="javascript:void(0);">
          <h6  routerLink="{{'/profile/' + user?.uid}}">{{user?.name}}</h6>
          <small class="text-muted">{{user?.userName}}</small>
        </a>
      </div>
    </div>
    `
})
export class UserSmallCardComponent implements OnInit {
    @Input() source: Observable<User>
    @Input() user: User
    constructor() { }

    ngOnInit() {
        let that = this;
        if (that.source)
            that.source.subscribe(d => that.user = d);
    }
}