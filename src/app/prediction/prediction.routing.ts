import { PredictionDetailComponent } from './prediction-detail.component';
import { Routes, RouterModule } from '@angular/router';
export const PREDICTION_ROUTES: Routes = [
    {
        path: 'prediction/:id',
        component: PredictionDetailComponent
    }
];
