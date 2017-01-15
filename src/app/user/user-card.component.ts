import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'user-card',
  template: `<div class="card">
        <div class="card-block">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-4">
              <img class="card-img-top center-block" [src]="user?.photoUrl" width="60" height="60" alt="">
            </div>
            <div class="col-sm-12 col-md-12 col-lg-8">
              <h4 class="card-title">{{user?.name}}</h4>
              <small class="card-text text-muted">{{user?.email}}</small>
            </div>
          </div>
          <div class="card-block">
            <div class="row" *ngIf="!(user?.isSelf|async)">
              <button type="button" *ngIf="!(user?.isFollowingByCurrentUser|async)" class="btn btn-default btn-sm" (click)="follow(user)">
              <i class="fa fa-user-plus" aria-hidden="true"></i> Follow
            </button>
              <button type="button" *ngIf="(user?.isFollowingByCurrentUser|async)" class="btn btn-primary  btn-sm" (click)="unFollow(user)">
              <i class="fa fa-ban" aria-hidden="true"></i> Unfollow
            </button>
            </div>
            <button type="button" *ngIf="(user?.isSelf|async)" class="btn btn-default btn-sm" (click)="edit(user)">
             <i class="fa fa-edit" aria-hidden="true"></i> Edit Profile
            </button>
          </div>
        </div>
      </div>`
})
export class UserCardComponent implements OnInit {
  @Input() source: Observable<User>
  @Input() user: User
  constructor(private userService: UserService
  ) { }

  ngOnInit() {
    let that = this;
    if (that.source)
      that.source.subscribe(d => that.user = d);
  }
  follow(user: User) {
    this.userService.follow(user.id);
  }
  unFollow(user: User) {
    this.userService.unFollow(user.id);
  }
  edit(user: User) {
    alert('not ready');
  }
}