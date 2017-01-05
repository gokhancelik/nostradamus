import { BaseModel } from './base.model';
export class Prediction extends BaseModel {
    public static fromJsonList(array): Prediction[] {
        return array.map(Prediction.fromJson);
    }
    public static fromJson({ $key, text, publishDate, hideDate,
        category, categoryText, imageUrl, likeCount,
        user, userEmail, userDisplayName, userPhotoUrl,creationDate,
        challengedPrediction}): Prediction {
        return new Prediction(
            $key, text, new Date(publishDate), new Date(hideDate),
            category, categoryText, imageUrl, likeCount,
            user, userEmail, userDisplayName, userPhotoUrl,creationDate,
            challengedPrediction
        );
    }
    constructor(
        id: string = null,
        public text: string = null,
        public publishDate: Date = new Date(),
        public hideDate: Date = new Date(),
        public category: string = null,
        public categoryText: string = null,
        public likeCount: number = 0,
        public imageUrl: string = null,
        public user: string = null,
        public userEmail: string = null,
        public userDisplayName: string = null,
        public userPhotoUrl: string = null,
        public creationDate: Date = new Date(),
        public challengedPrediction: Prediction = null
    ) {
        super();
        this.id = id;
    }

}
