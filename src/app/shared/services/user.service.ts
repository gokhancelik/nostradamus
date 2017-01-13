import { User } from './../models/user.model';
import { AuthService } from './../../security/auth.service';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireAuth, FirebaseRef } from 'angularfire2';
import { BaseFirebaseService } from './base.service';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class UserService extends BaseFirebaseService<User> {
    constructor(private afAuth: AngularFireAuth,
        private _af: AngularFireDatabase,
        @Inject(FirebaseRef) fb, private _authService: AuthService) {
        super(_af, 'users', fb, _authService);
    }

    public fromJson(obj) {
        return User.fromJson(obj);
    }
    public fromJsonList(array) {
        return User.fromJsonList(array);
    }
    add(value: User) {
        let that = this;
        that._af.list(that.getRoute()).push(value);
    }
    public getByUid(uid): Observable<User> {
        let user$ = this._af.list(this.getRoute(), { query: { orderByChild: 'uid', equalTo: uid, limitToLast: 1 } })
            .map(users => users[0])
        return user$.map(this.fromJson);
    }
    public follow(uid: string) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                let updates = {};
                updates[`${that.Route}/${uid}/followers/${user.id}`] = true;
                updates[`${that.Route}/${user.id}/following/${uid}`] = true;
                super.firebaseUpdate(updates);
                that.updateFollowerCount(user.id, 1);
                that.updateFollowingCount(uid, 1);
            }
        });
    }
    public unFollow(uid: string) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                let updates = {};
                updates[`${that.Route}/${uid}/followers/${user.id}`] = null;
                updates[`${that.Route}/${user.id}/following/${uid}`] = null;
                super.firebaseUpdate(updates);
                that.updateFollowerCount(user.id, -1);
                that.updateFollowingCount(uid, -1);
            }
        });
    }
    updateFollowerCount(uid: string, increment: number) {
        this._af.object(`${this.Route}/${uid}`).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.followerCount = user.followerCount < 0 ? 0 : user.followerCount;
                    // let followerCount = user.followerCount = user.followerCount + increment;
                    // let priority = user.priority || 0;
                    // user.priority = priority - (followerCount * 10000);
                }
                return user;
            });
    }
    updateFollowingCount(uid: string, increment: number) {
        this._af.object(`${this.Route}/${uid}`).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.followingCount = user.followingCount < 0 ? 0 : user.followingCount;
                    // let followingCount = user.followingCount = user.followingCount + increment;
                    // let priority = user.priority || 0;
                    // user.priority = priority - (followingCount * 10000);
                }
                return user;
            });
    }
}
