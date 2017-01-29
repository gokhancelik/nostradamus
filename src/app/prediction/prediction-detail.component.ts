import { ActivatedRoute, Params } from '@angular/router';
import { PredictionService } from './../shared/services/prediction.service';
import { Observable } from 'rxjs/Observable';
import { Prediction } from './../shared/models/prediction.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'prediction-detail',
    templateUrl: 'prediction-detail.component.html'
})
export class PredictionDetailComponent implements OnInit {
    prediction: Observable<Prediction>;
    constructor(private predictionService: PredictionService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        let that = this;
        that.activatedRoute.params.forEach((params: Params) => {
            if (params['id']) {
                that.prediction = that.predictionService.getByKey(params['id']);
            }
            else {
            }

        });
    }
}