import { UserService } from './services/user.service';
import { PredictionService } from './services/prediction.service';
import { CategoryService } from './services/category.service';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [PredictionService, CategoryService, UserService],
})
export class SharedModule { }
