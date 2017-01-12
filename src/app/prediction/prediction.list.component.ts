import { Prediction } from './../shared/models/prediction.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'prediction-list',
    templateUrl: 'prediction.list.component.html'
})
export class PredictionListComponent implements OnInit, OnChanges {
    @Input() source: Observable<Prediction[]>;
    constructor() { }

    ngOnInit() {

    }
    ngOnChanges(changes)
    {

    }
}