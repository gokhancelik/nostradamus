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

  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public predictionList: Observable<Prediction[]>;
  public trendCategories: Observable<Category[]>;
  // TypeScript public modifiers
  constructor(
    public predictionService: PredictionService, private categoryService: CategoryService
  ) {
    this.predictionList = this.predictionService.getAll();
    this.trendCategories = this.categoryService.getAll();
  }

  public ngOnInit() {
  }
}
