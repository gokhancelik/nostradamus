import { CategoryDetailComponent } from './category-detail.component';
import { Routes, RouterModule } from '@angular/router';
export const CATEGORY_ROUTES: Routes = [
    {
        path: 'category/:id',
        component: CategoryDetailComponent
    }
];
