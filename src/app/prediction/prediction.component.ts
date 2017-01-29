import { PredictionService } from './../shared/services/prediction.service';
import { ChallengeComponent } from './challenge.component';
import { Prediction } from './../shared/models/prediction.model';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser'
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'prediction',
    templateUrl: 'prediction.component.html',
    styles: [
        `.star {
      position: relative;  
      display: inline-block;
      font-size: 1rem;
    }
    .full {
      color: #0275d8;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: #0275d8;
    }`
    ]
})
export class PredictionComponent implements OnInit {
    @Input() prediction: Prediction;
    @ViewChild('challengeModal') challengeModal: ChallengeComponent;
    linkToShare: string;
    constructor(private predictionService: PredictionService, @Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
        this.linkToShare = this.document.location.origin + '/#/prediction/' + this.prediction.id;
    }
    challenge() {
        this.challengeModal.show();
    }
    like() {
        this.predictionService.like(this.prediction);
    }
    rateChanged(event) {
        // if (event)
        //     this.predictionService.rate(this.prediction, event);
        console.log(event);
    }
}