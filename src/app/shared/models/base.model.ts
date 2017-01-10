export abstract class BaseModel implements IModel {
    constructor(
        public id: any = null,
        public createdAt: Date = null,
        public createdBy: any = null,
        public modifiedAt: Date = null,
        public modifiedBy: any = null,
        public isDeleted: boolean = null,
        public deletedBy: any = null,
        public deletedAt: Date = null,
        public priority: number = null
        ) {
    }
}

export interface IModel {
    id: any;
    createdAt: Date;
    createdBy: any;
    modifiedAt: Date;
    modifiedBy: any;
    isDeleted: boolean;
    deletedBy: any;
    deletedAt: Date;
}
