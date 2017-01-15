import { Injectable } from '@angular/core';
import { CompanyService } from './../services/company.service';
import { Role } from './role.model';
import { Company } from './company.model';
import { Observable } from 'rxjs/Observable';
import { BaseModel } from './base.model';
export class User extends BaseModel {
    static fromJsonList(array): User[] {
        return array.map(User.fromJson);
    }
    static getColumns(): any {
        return {
            name: {
                title: 'name',
                type: 'string'
            },
            roleName: {
                title: 'role Name',
                type: 'string'
            },
            email: {
                title: 'email',
                type: 'string'
            },
            userName: {
                title: 'userName',
                type: 'string'
            },
            companyName: {
                title: 'company Name',
                type: 'string'
            },
            phone: {
                title: 'phone',
                type: 'string'
            }
        };
    }
    static fromJson({ $key, name, phone, userName, email, uid, photoUrl, followingCount, followerCount, predictionCount,likeCount, userObj, followers, followings, isFollowingByCurrentUser, isSelf }): User {
        return new User(
            $key, name, phone, userName, email, uid, photoUrl, followingCount, followerCount, predictionCount,likeCount, userObj, followers, followings, isFollowingByCurrentUser, isSelf);
    }
    constructor(
        id: string = null,
        public name: string = null,
        public phone: string = null,
        public userName: string = null,
        public email: string = null,
        public uid: string = null,
        public photoUrl: string = null,
        public followingCount: number = 0,
        public followerCount: number = 0,
        public predictionCount: number = 0,
        public likeCount: number = 0,
        public userObj: Observable<User> = null,
        public followers: Observable<User[]> = null,
        public followings: Observable<User[]> = null,
        public isFollowingByCurrentUser: Observable<boolean> = null,
        public isSelf: Observable<boolean> = null
    ) {
        super();
        this.id = id;

    }

}
