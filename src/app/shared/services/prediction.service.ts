import { CategoryService } from './category.service';
import { Category } from './../models/category.model';
import { AuthService } from './../../security/auth.service';
import { Prediction } from './../models/prediction.model';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireAuth, FirebaseRef } from 'angularfire2';
import { BaseFirebaseService } from './base.service';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class PredictionService extends BaseFirebaseService<Prediction> {
    constructor(private afAuth: AngularFireAuth,
        private _af: AngularFireDatabase,
        private authService: AuthService,
        private categoryService: CategoryService,
        @Inject(FirebaseRef) fb) {
        super(_af, 'predictions', fb);
    }
    fromJson(obj) {
        return Prediction.fromJson(obj);
    }
    fromJsonList(array) {
        return Prediction.fromJsonList(array);
    }
    add(value: Prediction) {
        this.authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                value.user = user.uid;
                value.userDisplayName = user.auth.displayName;
                value.userEmail = user.auth.email;
                value.userPhotoUrl = user.auth.photoURL;
                let newPostKey = this._af.list(this.getRoute()).push(null).key;
                let updates = {};
                if (!value.category) {
                    let catKey = this._af.list('categories').push(null).key;
                    updates['categories/' + catKey] = new Category(
                        null, value.categoryText, new Date(),
                        value.user, value.userDisplayName, value.userEmail, 0);
                    value.category = catKey;
                }
                updates[this.getRoute() + '/' + newPostKey] = value;
                updates['/userPredictions/' + value.user + '/' + newPostKey] = value;
                updates['/categoryPredictions/' + value.category] = newPostKey;
                super.firebaseUpdate(updates).subscribe(d => {
                    this.categoryService.updateCatPredictionCount(value.category);
                    console.log(d);
                });
            }
        });
    }
    public getAll(): Observable<Prediction[]> {
        const predictions$ = this._af.list('/predictions')
            .map(this.fromJsonList);
        return predictions$;
    }
}
