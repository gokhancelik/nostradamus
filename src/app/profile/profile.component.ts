import { Category } from './../shared/models/category.model';
import { CategoryService } from './../shared/services/category.service';
import { PredictionService } from './../shared/services/prediction.service';
import { Prediction } from './../shared/models/prediction.model';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './../security/auth.service';
import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
    FirebaseAuth, FirebaseAuthState
} from 'angularfire2/index';
@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    encapsulation: ViewEncapsulation.None,

})
export class ProfileComponent implements OnInit {
    predictions: Observable<Prediction[]>;
    likedPredictions: Observable<Prediction[]>;
    categories: Observable<Category[]>;
    followings: Observable<User[]>;
    followers: Observable<User[]>;
    user: User;
    currentUser: User;
    firebaseUser: firebase.User
    constructor(private activatedRoute: ActivatedRoute, private auth: FirebaseAuth,
        private userService: UserService,
        private authService: AuthService,
        private predictionService: PredictionService,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        let that = this;
        that.authService.getUserInfo().subscribe(
            data => that.currentUser = data
        );
        that.auth.take(1).subscribe(d =>
            that.firebaseUser = d !== null ? d.auth : null
        )
        that.activatedRoute.params.forEach((params: Params) => {
            if (params['id']) {
                that.userService.getByUid(params['id']).subscribe(
                    data => {
                        that.user = data
                        that.predictions = that.predictionService.getUserPredictions(that.user.id);
                        that.likedPredictions = that.predictionService.getUserLikedPredictions(that.user.id);
                        that.categories = that.categoryService.getUserCategories(that.user.id);
                        that.followers = that.user.followers;
                        that.followings = that.user.followings;
                    }
                );

            }
            else {
                that.user = that.currentUser;
            }

        });
    }

}