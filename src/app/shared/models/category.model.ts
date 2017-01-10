import { BaseModel } from './base.model';
export class Category extends BaseModel {
    public static fromJsonList(array): Category[] {
        return array.map(Category.fromJson);
    }
    public static fromJson({ $key, text,
        createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt,
        predictionsCount}): Category {
        return new Category(
            $key, text,
            createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt,
            predictionsCount
        );
    }
    constructor(
        id: string = null,
        public text: string = null,
        createdAt: Date = null,
        createdBy: string = null,
        modifiedAt: Date = null,
        modifiedBy: string = null,
        isDeleted: boolean = false,
        deletedBy: string = null,
        deletedAt: Date = null,
        public predictionsCount: number = 0,
    ) {
        super(id, createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, deletedBy, deletedAt);
    }

}
