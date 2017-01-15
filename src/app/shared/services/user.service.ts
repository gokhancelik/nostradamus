import { Category } from './../models/category.model';
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
    public mapRelationalObject(obj: User) {
        let that = this;
        obj.isFollowingByCurrentUser = this.isFollowingByCurrentUser(obj);
        obj.followers = this.getFollowers(obj.id);
        obj.followings = this.getFollowings(obj.id);
        obj.isSelf = this.isSelf(obj);
        return obj;
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
    public exist(uid): Observable<boolean> {
        let exist$ = this._af.list(this.getRoute(), { query: { orderByChild: 'uid', equalTo: uid, limitToLast: 1 } })
            .map(users => {
                if (users)
                    return users[0] && users[0].uid === uid;
                else
                    return Observable.of(false);
            });
        return exist$;
    }
    public getByUid(uid): Observable<User> {
        let user$ = this._af.list(this.getRoute(), { query: { orderByChild: 'uid', equalTo: uid, limitToLast: 1 } })
            .map(users => {
                if (users)
                    return users[0];
                else
                    return Observable.of(null);
            });
        return user$.map(this.fromJson)
            .map(t => { return this.mapRelationalObject(t); });
    }
    public isSelf(user: User): Observable<boolean> {
        const isLikedByCurrentUser$ = this._authService.getUserInfo().take(1).switchMap(cu => {
            if (cu)
                return Observable.of(cu.id === user.id);
            else {
                return Observable.of(false);
            }
        });
        return isLikedByCurrentUser$;
    }
    public isFollowingByCurrentUser(following: User): Observable<boolean> {
        const isLikedByCurrentUser$ = this._authService.getUserInfo().take(1).switchMap(cu => {
            if (cu)
                return this.isFollowingByUser(following, cu);
            else {
                return Observable.of(false);
            }
        });
        return isLikedByCurrentUser$;
    }
    public isFollowingByUser(following: User, user: User): Observable<boolean> {
        if (user)
            return this._af.object(this.Route + '/' + user.id + '/following/' + following.id).map(
                likes => { return likes.$value !== null }
            )
        else {
            return Observable.of(false);
        }
    }
    public follow(uid: string) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                let updates = {};
                updates[that.Route + '/' + uid + '/followers/' + user.id] = true;
                updates[that.Route + '/' + user.id + '/following/' + uid] = true;
                super.firebaseUpdate(updates);
                that.updateFollowerCount(uid, 1);
                that.updateFollowingCount(user.id, 1);
            }
        });
    }
    public unFollow(uid: string) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                let updates = {};
                updates[that.Route + '/' + uid + '/followers/' + user.id] = null;
                updates[that.Route + '/' + user.id + '/following/' + uid] = null;
                super.firebaseUpdate(updates);
                that.updateFollowerCount(uid, -1);
                that.updateFollowingCount(user.id, -1);
            }
        });
    }
    updateFollowerCount(uid: string, increment: number) {
        this._af.object(this.Route + '/' + uid).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.followerCount = !user.followerCount || user.followerCount < 0 ? 0 : user.followerCount;
                    let followerCount = user.followerCount = user.followerCount + increment;
                    // let priority = user.priority || 0;
                    // user.priority = priority - (followerCount * 10000);
                }
                return user;
            });
    }
    updateFollowingCount(uid: string, increment: number) {
        this._af.object(this.Route + '/' + uid).$ref // _sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.followingCount = !user.followingCount || user.followingCount < 0 ? 0 : user.followingCount;
                    let followingCount = user.followingCount = user.followingCount + increment;
                    // let priority = user.priority || 0;
                    // user.priority = priority - (followingCount * 10000);
                }
                return user;
            });
    }
    updatePredictionCount(uid: string, increment: number) {
        this._af.object(this.Route + '/' + uid).$ref // _sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.predictionCount = !user.predictionCount || user.predictionCount < 0 ? 0 : user.predictionCount;
                    let predictionCount = user.predictionCount = user.predictionCount + increment;
                }
                return user;
            });
    }
    updateLikeCount(uid: string, increment: number) {
        this._af.object(this.Route + '/' + uid).$ref // _sdkDb.child('categroies/' + categoryKey)
            .transaction(function (user) {
                if (user) {
                    user.likeCount = !user.likeCount || user.likeCount < 0 ? 0 : user.likeCount;
                    let likeCount = user.likeCount = user.likeCount + increment;
                }
                return user;
            });
    }
    public getFollowers(userKey: string): Observable<User[]> {
        let that = this;
        const follower$ = this._af.list('users/' + userKey + '/followers')
            .map((followerKeys) => {
                return followerKeys
                    .map((followerKey) => {
                        return that._af.object(that.Route + '/' + followerKey.$key)
                    })
            })
            .flatMap((res) => {
                return Observable.combineLatest(res);
            }).map(that.fromJsonList)
            .map(predicts => {
                return predicts.map(t => { return that.mapRelationalObject(t); });
            });
        return follower$;
    }
    public getFollowings(userKey: string): Observable<User[]> {
        let that = this;
        const followings$ = this._af.list('users/' + userKey + '/following')
            .map((followingKeys) => followingKeys
                .map((followingKey) => {
                    return that._af.object(that.Route + '/' + followingKey.$key)
                }))
            .flatMap((res) => {
                return Observable.combineLatest(res);
            }).map(that.fromJsonList)
            .map(predicts => {
                return predicts.map(t => { return that.mapRelationalObject(t); });
            });
        return followings$;
    }
   
}
