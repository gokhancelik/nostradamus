import { User } from './../models/user.model';
import { UserService } from './user.service';
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
        private _authService: AuthService,
        private categoryService: CategoryService,
        private userService: UserService,
        @Inject(FirebaseRef) fb) {
        super(_af, 'predictions', fb, _authService);
    }
    public mapRelationalObject(obj: Prediction) {
        let that = this;
        obj.categoryObj = this.categoryService.getByKey(obj.category);
        obj.userObj = this.userService.getByKey(obj.user);
        obj.isLikedByCurrentUser = that.isLikedByCurrentUser(obj);
        if (obj.challengedPrediction) {
            obj.challengedPredictionObj = that.getByKey(obj.challengedPrediction);
        }
        return obj;
    }
    fromJson(obj) {
        return Prediction.fromJson(obj);
    }
    fromJsonList(array) {
        return Prediction.fromJsonList(array);
    }
    public isLikedByCurrentUser(prediction: Prediction): Observable<boolean> {
        const isLikedByCurrentUser$ = this._authService.getUserInfo().take(1).switchMap(user => {
            if (user)
                return this._af.object(this.getRoute() + '/' + prediction.id + '/likes/' + user.id).map(
                    likes => { return likes.$value !== null }
                )
            else {
                return Observable.of(false);
            }
        });
        return isLikedByCurrentUser$;
    }
    public isLikedByUser(prediction: Prediction, user: User): Observable<boolean> {
        if (user)
            return this._af.object(this.getRoute() + '/' + prediction.id + '/likes/' + user.id).map(
                likes => { return likes.$value !== null }
            )
        else {
            return Observable.of(false);
        }
    }
    public getByKey(key): Observable<Prediction> {
        let that = this;
        const prediction$ = this._af.object(this.getRoute() + '/' + key)
            .map(this.fromJson)
            .map(t => { return that.mapRelationalObject(t); });
        return prediction$;
    }
    public getAll(): Observable<Prediction[]> {
        let that = this;

        const predicts$ = this._af.list(this.getRoute(), { query: { orderByChild: 'priority' } })
            .map(that.fromJsonList)
            .map(predicts => {
                return predicts.map(t => { return that.mapRelationalObject(t); });
            });

        return predicts$;
    }
    predict(value: Prediction, categoryText: string) {
        let that = this;
        value.isChallenge = false;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                value = super.preparePreCreateByUser(value, user)
                value.user = user.id;
                let newPostKey = that._af.list(that.getRoute()).push(null).key;
                let updates = {};
                that.categoryService.getBytext(categoryText).take(1).subscribe(
                    cat => {
                        if (!cat) {
                            let catKey = that._af.list('categories').push(null).key;
                            let category = new Category();
                            category = that.categoryService.preparePreCreateByUser(category, user);
                            category.text = categoryText;
                            updates['categories/' + catKey] = category;
                            value.category = catKey;
                        } else {
                            value.category = cat.id;
                        }
                        updates[that.getRoute() + '/' + newPostKey] = value;
                        updates['users/' + user.id + '/predictions/' + newPostKey] = true;
                        super.firebaseUpdate(updates);
                        that.categoryService.updateCatPredictionCount(value.category);
                        that.userService.updatePredictionCount(user.id, 1);
                    }
                )


            }
        });
    }
    challenge(newPrediction: Prediction, oldPrediction: Prediction) {
        newPrediction.category = oldPrediction.category;
        newPrediction.hideDate = oldPrediction.hideDate;
        newPrediction.publishDate = oldPrediction.publishDate;
        newPrediction.isChallenge = true;
        //newPrediction.parentPrediction = oldPrediction;
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                newPrediction = super.preparePreCreateByUser(newPrediction, user)
                newPrediction.user = user.id;
                let newPostKey = that._af.list(that.getRoute()).push(null).key;
                let updates = {};
                updates[that.getRoute() + '/' + newPostKey] = newPrediction;
                //updates[that.getRoute() + '/' + newPostKey + '/parentPrediction'] = oldPrediction;
                updates[that.getRoute() + '/' + oldPrediction.id + '/challengedPrediction'] = newPostKey;
                super.firebaseUpdate(updates);
                that.categoryService.updateCatPredictionCount(newPrediction.category);
                that.userService.updatePredictionCount(user.id, 1);
            }
        });
    }
    like(prediction: Prediction) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                that.isLikedByUser(prediction, user).take(1).subscribe(
                    liked => {
                        if (!liked) {
                            let updates = {};
                            updates[that.getRoute() + '/' + prediction.id + '/likes/' + user.id] = true;
                            updates['users/' + user.id + '/likedPredictions/' + prediction.id] = true;
                            super.firebaseUpdate(updates);
                            that.updateLikeCount(prediction.id, 1);
                            that.userService.updateLikeCount(user.id, 1);
                        } else {
                            let updates = {};
                            updates[that.getRoute() + '/' + prediction.id + '/likes/' + user.id] = null;
                            updates['users/' + user.id + '/likedPredictions/' + prediction.id] = null;
                            super.firebaseUpdate(updates);
                            that.updateLikeCount(prediction.id, -1);
                            that.userService.updateLikeCount(user.id, -1);
                        }
                    }
                )

            }
        });
    }
    rate(prediction: Prediction, rate) {
        let that = this;
        this._authService.getUserInfo().take(1).subscribe(user => {
            if (user) {
                let updates = {};
                updates[that.getRoute() + '/' + prediction.id + '/rates/' + user.id] = rate;
                updates['users/' + user.id + '/ratedPredictions/' + prediction.id] = rate;
                super.firebaseUpdate(updates);
                that.updateRate(prediction.id, rate);
            }
        });
    }
    public updateRate(predictionKey, rate) {
        this._af.object(this.getRoute() + '/' + predictionKey).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (prediction) {
                if (prediction) {
                    prediction.rateCount = !prediction.rateCount || prediction.rateCount < 0 ? 0 : prediction.rateCount;
                    let rateCount = prediction.rateCount = prediction.rateCount + 1;
                    let totalRate = prediction.rate || 0;
                    let newTotalRate = prediction.rate = totalRate + rate;
                    let priority = prediction.priority || 0;
                    prediction.priority = priority - (newTotalRate * 100);
                }
                return prediction;
            });
    }
    public updateLikeCount(predictionKey, increment) {
        this._af.object(this.getRoute() + '/' + predictionKey).$ref//_sdkDb.child('categroies/' + categoryKey)
            .transaction(function (prediction) {
                if (prediction) {
                    prediction.likeCount = !prediction.likeCount || prediction.likeCount < 0 ? 0 : prediction.likeCount;
                    let like = prediction.likeCount = prediction.likeCount + increment;
                    let priority = prediction.priority || 0;
                    prediction.priority = priority - (like * 10000);
                }
                return prediction;
            });
    }
    public getUserPredictions(userKey: string): Observable<Prediction[]> {
        let that = this;
        const predicts$ = this._af.list(this.getRoute(), { query: { orderByChild: 'user', equalTo: userKey } })
            .map(that.fromJsonList)
            .map(predicts => {
                return predicts.map(t => { return that.mapRelationalObject(t); });
            });

        return predicts$;
    }
    public getUserLikedPredictions(userKey: string): Observable<Prediction[]> {
        let that = this;
        const predicts$ = this._af.list('users/' + userKey + '/likedPredictions')
            .map((predictionKeys) => predictionKeys
                .map((predictionKey) => {
                    return that._af.object(that.Route + '/' + predictionKey.$key)
                }))
            .flatMap((res) => {
                return Observable.combineLatest(res);
            })
            .map(that.fromJsonList)
            .map(predicts => {
                return predicts.map(t => { return that.mapRelationalObject(t); });
            });
        predicts$.subscribe(console.log);
        return predicts$;
    }
}
