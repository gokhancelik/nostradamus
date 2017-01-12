import { PredictionService } from './../shared/services/prediction.service';
import { Prediction } from './../shared/models/prediction.model';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './../security/auth.service';
import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
    FirebaseAuth, FirebaseAuthState
} from 'angularfire2/index';
@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    public predictions: Observable<Prediction[]>;

    user: User;
    currentUser: User;
    firebaseUser: firebase.User
    constructor(private activatedRoute: ActivatedRoute, private auth: FirebaseAuth, private userService: UserService,
        private authService: AuthService, private predictionService: PredictionService) {
    }

    ngOnInit() {
        this.authService.getUserInfo().subscribe(
            data => this.currentUser = data
        );
        this.auth.take(1).subscribe(d =>
            this.firebaseUser = d.auth
        )
        this.activatedRoute.params.forEach((params: Params) => {
            if (params['id'])
                this.userService.getByUid(params['id']).subscribe(
                    data => {
                        this.user = data
                        this.predictions = this.predictionService.getUserPredictions(this.user.uid);
                    }
                );
            else {
                this.user = this.currentUser;
            }

        });
    }
}