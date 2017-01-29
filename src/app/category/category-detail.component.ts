import { Category } from './../shared/models/category.model';
import { CategoryService } from './../shared/services/category.service';
import { Prediction } from './../shared/models/prediction.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { PredictionService } from './../shared/services/prediction.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'category-detail',
    templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
    predictionList: Observable<Prediction[]>;
    category: Observable<Category>;
    trendCategories: Observable<Category[]>;
    constructor(private predictionService: PredictionService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute) {
        this.trendCategories = this.categoryService.getTrends();
    }

    ngOnInit() {
        let that = this;
        that.activatedRoute.params.forEach((params: Params) => {
            if (params['id']) {
                that.category = that.categoryService.getByKey(params['id']);
                that.predictionList = that.predictionService.getByCategory(params['id']);
            }
            else {
            }

        });
    }
}