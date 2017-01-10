import { PredictionService } from './../shared/services/prediction.service';
import { ChallengeComponent } from './challenge.component';
import { Prediction } from './../shared/models/prediction.model';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'prediction',
    templateUrl: 'prediction.component.html'
})
export class PredictionComponent implements OnInit {
    @Input() prediction: Prediction;
    @ViewChild('challengeModal') challengeModal: ChallengeComponent;

    constructor(private predictionService: PredictionService) { }

    ngOnInit() { }
    challenge() {
        this.challengeModal.show();
    }
    like() {
        this.predictionService.like(this.prediction);
    }
}