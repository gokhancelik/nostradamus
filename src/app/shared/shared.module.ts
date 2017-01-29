import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { PredictionService } from './services/prediction.service';
import { CategoryService } from './services/category.service';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [PredictionService, CategoryService, UserService, StorageService],
})
export class SharedModule { }
