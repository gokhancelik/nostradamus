import { CategoryService } from './../shared/services/category.service';
import { Category } from './../shared/models/category.model';
import { Prediction } from './../shared/models/prediction.model';
import { Observable } from 'rxjs/Rx';
import { PredictionService } from './../shared/services/prediction.service';
import {
  Component,
  OnInit, ViewEncapsulation
} from '@angular/core';

import { AppState } from '../app.service';

@Component({
  encapsulation: ViewEncapsulation.None,

  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public predictionList: Observable<Prediction[]>;
  public trendCategories: Observable<Category[]>;
  constructor(
    public predictionService: PredictionService, private categoryService: CategoryService
  ) {
    this.predictionList = this.predictionService.getAll();
    this.trendCategories = this.categoryService.getTrends();
  }

  public ngOnInit() {

  }
}
