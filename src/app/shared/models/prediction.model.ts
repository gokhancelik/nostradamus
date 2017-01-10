import { Observable } from 'rxjs/Rx';
import { Category } from './category.model';
import { User } from './user.model';
import { BaseModel } from './base.model';

export class Prediction extends BaseModel {
    public static fromJsonList(array): Prediction[] {
        return array.map(Prediction.fromJson);
    }
    public get isHidden(): boolean {
        return this.hideDate < new Date() && this.publishDate > new Date()
    }
    public static fromJson({
        $key, text, publishDate, hideDate,
        category, categoryObj, imageUrl, likeCount, isChallenge,
        user, userObj,
        isLikedByCurrentUser,
        createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt,
        challengedPrediction, challengedPredictionObj
    }, isFirst = true): Prediction {
        return new Prediction(
            $key, text, new Date(publishDate), new Date(hideDate),
            category, categoryObj, imageUrl, likeCount, isChallenge,
            user, userObj,
            challengedPrediction,
            challengedPredictionObj,
            isLikedByCurrentUser,
            createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt,
        );
    }
    constructor(
        id: string = null,
        public text: string = null,
        public publishDate: Date = new Date(),
        public hideDate: Date = new Date(),
        public category: string = null,
        public categoryObj: Observable<Category> = null,
        public likeCount: number = 0,
        public imageUrl: string = null,
        public isChallenge: boolean = false,
        public user: string = null,
        public userObj: Observable<User> = null,
        public challengedPrediction: string = null,
        public challengedPredictionObj: Observable<Prediction> = null,
        public isLikedByCurrentUser: Observable<boolean> = null,
        createdAt: Date = null,
        createdBy: string = null,
        modifiedAt: Date = null,
        modifiedBy: string = null,
        isDeleted: boolean = false,
        deletedBy: string = null,
        deletedAt: Date = null,
    ) {
        super(id, createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt);
    }

}
