import { Subject } from 'rxjs/Rx';
import { FirebaseRef } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class StorageService {
    private storageRef: any;
    constructor( @Inject(FirebaseRef) fb) {
        this.storageRef = fb.storage().ref();
    }
    upload(userKey: string, name: string, contentType: string, file: File) {
        let metadata = {
            contentType: contentType
        };
        let imagesRef = this.storageRef
            .child(`${userKey}/${name}`);
        return imagesRef.put(file, metadata);
    }
    getDownloadUrlByUserKey(userKey: string, name: string) {
        let imagesRef$ = this.storageRef
            .child(`${userKey}/${name}`).getDownloadURL();
        return imagesRef$;
    }
    getDownloadUrl(url: string) {
        let imagesRef$ = this.storageRef
            .child(`${url}`).getDownloadURL();
        return imagesRef$;
    }
}
