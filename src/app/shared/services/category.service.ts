import { AuthService } from './../../security/auth.service';
import { Category } from './../models/category.model';
import { Prediction } from './../models/prediction.model';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireAuth, FirebaseRef } from 'angularfire2';
import { BaseFirebaseService } from './base.service';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class CategoryService extends BaseFirebaseService<Category> {
    constructor(private afAuth: AngularFireAuth,
        private _af: AngularFireDatabase,
        @Inject(FirebaseRef) fb, private _authService: AuthService) {
        super(_af, 'categories', fb, _authService);
    }
    public fromJson(obj) {
        return Category.fromJson(obj);
    }
    public fromJsonList(array) {
        return Category.fromJsonList(array);
    }
    public search(): Observable<Category[]> {
        // const cats$ = this._af.list('categories/', {
        //     query: {
        //         orderByChild: 'text', startAt: name
        //     }
        // })
        //     .map(this.fromJsonList);
        return this.getAll();
    }
    getBytext(text): Observable<Category> {
        return this._af.list(this.getRoute(), { query: { orderByChild: 'text', equalTo: text } })
            .map(this.fromJsonList)
            .map(cats => { return cats[0] })
    }
    /**
        * Should call after prediction added.
        */
    public updateCatPredictionCount(categoryKey) {
        this._af.object('categories/' + categoryKey).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (category) {
                if (category) {
                    let pred = category.predictionsCount++;
                    category.priority = category.priority - (pred * 1000)
                }
                return category;
            }, function (error, committed, snapshot) {
                if (error) {
                    console.log("error in transaction");
                } else if (!committed) {
                    console.log("transaction not committed");
                } else {
                    console.log("Transaction Committed");
                }
            }, true);
    }
    public getUserCategories(userEmail: string): Observable<Category[]> {
        let that = this;
        const cats$ = this._af.list(this.getRoute(), { query: { orderByChild: 'createdBy', equalTo: userEmail } })
            .map(that.fromJsonList)
        return cats$;
    }
}
