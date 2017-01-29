import { IModel } from './../models/base.model';
import { User } from './../models/user.model';
import { CurrentUser } from './../../security/currentUser.model';
import { AuthService } from './../../security/auth.service';
import { BaseModel } from '../models/base.model';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2';
export abstract class BaseFirebaseService<T extends BaseModel> implements IService<T>{
    _sdkDb: any;
    constructor(private af: AngularFireDatabase, private _route: string,
        _fb: any = null, private authService: AuthService) {
        this._sdkDb = _fb ? _fb.database().ref() : null;
    }
    getAll(): Observable<T[]> {
        return this.af.list(this._route, { query: { orderByChild: 'priority' } })
            .map(this.fromJsonList);
    }
    
    public getRoute(): string {
        return this._route;
    }
    public setRoute(value) {
        this._route = value;
    }
    public get Route(): string {
        return this._route;
    }
    getByKey(key: string): Observable<T> {
        return this.af.object(this._route + '/' + key)
            .map(this.fromJson);
    }
    add(value: T) {
        let that = this;
        this.preparePreCreate(value).subscribe(
            d => {

                that.af.list(that._route).push(d);
            }
        );
    }
    update(key: string, value: T) {
        let that = this;
        this.preparePreModify(value).subscribe(d => {

            that.af.object(this._route + '/' + key).update(d);
        });
    }
    delete(key: string) {

        this.preparePreDelete().subscribe(
            value => {
                this.af.object(this._route + '/' + key).update(value);
            }
        );
    }
    firebaseUpdate(dataToSave) {
        const subject = new Subject();
        if (this._sdkDb) {
            this._sdkDb.update(dataToSave)
                .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
                );
            return subject.asObservable();
        }
        else {
            alert('sdk eklenmeden firebaseUpdate methodu çalıştırılamaz.');
        }
    }
    mapObjectToFirebaseObject(value: T): any {
        let updatedObj = {};
        Object.keys(value).forEach(k => {
            if (value[k] instanceof Date) {
                updatedObj[k] = (value[k] as Date).getTime();
            }
            else
                updatedObj[k] = value[k];
        });
        return updatedObj;
    }
    preparePreModify(value: T): Observable<T> {
        let that = this;
        return this.authService.getUserInfo().take(1).map(
            user => {
                if (user && user) {
                    return that.preparePreModifyByUser(value, user);
                }
                else {
                    alert('Giriş yapmadan bu işlemi yapamazsınız');
                    throw 'Giriş yapmadan bu işlemi yapamazsınız';
                }
            }
        );
    }
    preparePreDelete(): Observable<any> {
        let that = this;
        return this.authService.getUserInfo().take(1).map(
            user => {
                if (user && user) {
                    let value = that.preparePreDeleteByUser(user);
                    return value;
                }
                else {
                    alert('Giriş yapmadan bu işlemi yapamazsınız');
                    throw 'Giriş yapmadan bu işlemi yapamazsınız';
                }
            }
        );
    }
    preparePreDeleteByUser(user: User): any {
        return {
            deletedAt: new Date().getTime(),
            deletedBy: user.id,
            isDelete: true
        }
    }
    preparePreCreate(value: T): Observable<T> {
        let that = this;
        return this.authService.getUserInfo().take(1).map(
            user => {
                if (user && user) {
                    return that.preparePreCreateByUser(value, user);
                }
                else {
                    alert('Giriş yapmadan bu işlemi yapamazsınız');
                    throw 'Giriş yapmadan bu işlemi yapamazsınız';
                }
            }
        );
    }
    preparePreModifyByUser(value: T, user: User): any {
        value.modifiedAt = new Date();
        value.modifiedBy = user.id;
        let nd = this.mapObjectToFirebaseObject(value);
        return nd;
    }
    preparePreCreateByUser(value: T, user: User): any {
        value.createdAt = new Date();
        value.modifiedAt = new Date();
        value.createdBy = user.id;
        value.modifiedBy = user.id;
        value.priority = (value.createdAt.getTime() * -1)
        let nd = this.mapObjectToFirebaseObject(value);
        return nd;
    }
    abstract fromJsonList(array);
    abstract fromJson(obj: any);
}
export interface IService<T extends IModel> {

    getAll(): Observable<T[]>;
    getByKey(key: any): Observable<T>;
    add(data: T);
    delete(key: any);
    update(key: any, data: T);
}

