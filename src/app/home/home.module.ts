import { CategoryModule } from './../category/category.module';
import { PredictionModule } from './../prediction/prediction.module';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [ComponentsModule, PredictionModule, CategoryModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
