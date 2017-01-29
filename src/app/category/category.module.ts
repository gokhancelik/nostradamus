import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../components/components.module';
import { RouterModule } from '@angular/router';
import { PredictionModule } from './../prediction/prediction.module';
import { CategoryDetailComponent } from './category-detail.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category.list.component';

@NgModule({
    imports: [CommonModule, PredictionModule, ReactiveFormsModule, FormsModule, NgbModule.forRoot(), RouterModule, ComponentsModule],
    exports: [CategoryListComponent],
    declarations: [CategoryListComponent, CategoryDetailComponent],
    providers: [],
})
export class CategoryModule { }
