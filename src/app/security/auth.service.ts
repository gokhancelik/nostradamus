import { User } from './../shared/models/user.model';
import { Role } from './../shared/models/role.model';
import { RoleService } from './../shared/services/role.service';
import { CurrentUser } from './currentUser.model';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import {
    FirebaseAuth, FirebaseAuthState, AuthProviders,
    AuthMethods, AngularFireDatabase
} from 'angularfire2/index';
import { AuthInfo } from './auth.info';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(private auth: FirebaseAuth,
        private fDb: AngularFireDatabase,
        private router: Router) {
    }
    public register(email, password): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.createUser(
            {
                email,
                password
            }));
    }
    public login(email, password): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.login({ email, password }
            ,
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password,
            }));
    }
    public loginWthFacebook(): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        }));
    }
    public loginWithGoogle(): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        }));
    }
    public loginWithTwitter(): Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.login({
            provider: AuthProviders.Twitter,
            method: AuthMethods.Popup
        }));
    }
    public signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.auth.createUser({ email, password }));
    }
    getUserInfo(): Observable<User> {
        let auth$ = this.auth;
        let usersFirebase$ = auth$.switchMap(value => {
            if (value)
                return this.fDb.list('users', {
                    query: { orderByChild: 'uid', equalTo: value.uid, limitToFirst: 1 }
                })
            else {
                return Observable.of();
            }
        });
        let users$ = usersFirebase$.map(User.fromJsonList);
        let user$ = users$.map(users => {
            return users ? users[0] : Observable.of();
        })
        return user$.take(1);
    }
    public logout() {
        this.auth.logout();
        this.router.navigate(['/home']);
    }
    /*
     *
     * This is a demo on how we can 'Observify' any asynchronous interaction
     *
     *
     * */

    private fromFirebaseAuthPromise(promise): Observable<any> {

        const subject = new Subject<any>();
        let test;
        promise
            .then(res => {
                subject.next(res);
                subject.complete();
            },
            err => {
                subject.error(err);
                subject.complete();
            });
        return subject.asObservable();
    }


}
