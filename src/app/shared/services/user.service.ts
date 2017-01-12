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
        user$.subscribe(console.log);
        return user$.map(this.fromJson);
    }
}
