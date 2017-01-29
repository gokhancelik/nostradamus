import { StorageService } from './../shared/services/storage.service';
import { User } from './../shared/models/user.model';
import { AuthService } from './../security/auth.service';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FirebaseAuth, FirebaseAuthState
} from 'angularfire2/index';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    user: User;
    firebaseUser: firebase.User;
    private uploadedImage: File;
    private uploadedImageUrl: string;
    constructor(private userService: UserService,
        private authService: AuthService, private auth: FirebaseAuth,
        private storageService: StorageService) { }

    ngOnInit() {
        let that = this;
        that.auth.take(1).subscribe(d =>
            that.firebaseUser = d !== null ? d.auth : null
        )
        that.userService.getCurrentUser().subscribe(
            data => { that.user = data; }
        );
    }
    onSubmit() {
        this.userService.updateProfile(this.user.name, this.uploadedImage);
        this.firebaseUser.updateProfile({ displayName: this.user.name, photoURL: this.user.photoUrl })
    }
    public imageChanged(event) {
        if (!event.srcElement.files.length) {
            return;
        }
        let that = this;
        let file: File = event.srcElement.files[0];
        if (file.type.split('/')[0] === 'image') {
            that.uploadedImage = file;
            var reader = new FileReader();
            reader.onload = (e: any) => {
                that.uploadedImageUrl = e.target.result;
            }

            reader.readAsDataURL(that.uploadedImage);
        }
    }
    public deleteImage() {
        this.uploadedImageUrl = null;
        this.uploadedImage = null;
    }
}