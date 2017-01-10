import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category.list.component';

@NgModule({
    imports: [CommonModule],
    exports: [CategoryListComponent],
    declarations: [CategoryListComponent],
    providers: [],
})
export class CategoryModule { }
