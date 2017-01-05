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
        @Inject(FirebaseRef) fb) {
        super(_af, 'categories', fb);
    }
    public fromJson(obj) {
        return Category.fromJson(obj);
    }
    public fromJsonList(array) {
        return Category.fromJsonList(array);
    }
    public search(name): Observable<Category[]> {
        const cats$ = this._af.list('categories/', {
            query: {
                orderByChild: 'text', startAt: name
            }
        })
            .map(this.fromJsonList);
        return cats$;
    }

    /**
        * Should call after prediction added.
        */
    public updateCatPredictionCount(categoryKey) {
        this._af.object('categories/' + categoryKey).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (category) {
                if (category) {
                    category.predictionsCount++;
                }
                return category;
            });
    }
}
