import { PredictionAddComponent } from './prediction.add.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'predict-button',
    encapsulation: ViewEncapsulation.None,
    template: `
    <button type="button" class="btn btn-primary" (click)="openPredictModal()">
  Predict
</button>
<prediction-add #predictModal (onSaved)="onSaved($event)"></prediction-add>
    `
})
export class PredictButtonComponent implements OnInit {
    @ViewChild('predictModal') predictModal: PredictionAddComponent;
    constructor() { }

    ngOnInit() { }
    public openPredictModal() {
        this.predictModal.show();
    }
}