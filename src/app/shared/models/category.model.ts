import { BaseModel } from './base.model';
export class Category extends BaseModel {
    public static fromJsonList(array): Category[] {
        return array.map(Category.fromJson);
    }
    public static fromJson({ $key, text, creationDate, creator, creatorDisplayName, creatorEmail,
        predictionsCount}): Category {
        return new Category(
            $key, text, creationDate, creator, creatorDisplayName, creatorEmail,
            predictionsCount
        );
    }
    constructor(
        id: string = null,
        public text: string = null,
        public creationDate: Date = new Date(),
        public creator: string = '',
        public creatorDisplayName: string = '',
        public creatorEmail: string = '',
        public predictionsCount: number = 0,
    ) {
        super();
        this.id = id;
    }

}
