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
    selector: 'profile-settings',
    templateUrl: 'settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
    user: User;
    firebaseUser: firebase.User
    constructor(private activatedRoute: ActivatedRoute, private auth: FirebaseAuth,
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        let that = this;
        that.userService.getCurrentUser().subscribe(
            data => { that.user = data; console.log(data) }
        );
        // that.auth.take(1).subscribe(d =>
        //     that.firebaseUser = d !== null ? d.auth : null
        // )
    }

}