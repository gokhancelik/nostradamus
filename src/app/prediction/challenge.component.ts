import { PredictionService } from './../shared/services/prediction.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Prediction } from './../shared/models/prediction.model';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'challenge',
    template: `<div bsModal #formModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button class="close" (click)="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body" *ngIf="model">
                            <form (ngSubmit)="save()" #predictionForm="ngForm">
                            <div class="form-group">
                                <label for="text">Prediction</label>
                                <textarea type="text" class="form-control" id="text" required [(ngModel)]="model.text" name="text" #text="ngModel"></textarea>
                                <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
                                Prediction is required
                                </div>
                            </div>
                            <button type="submit" class="btn btn-default" [disabled]="!predictionForm.form.valid">Challenge</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                        </div>
                        </div>
                    </div>
                    </div>
                    `
})
export class ChallengeComponent implements OnInit {
    @ViewChild('formModal') public formModal: ModalDirective;
    @Input() prediction: Prediction;
    model: Prediction;
    constructor(private predictionService: PredictionService) { }

    ngOnInit() { }
    public save() {
        if (!this.prediction) {
            alert("You should select a prediction to challenge");
            return;
        }

        this.predictionService.challenge(this.model, this.prediction);
        //if (this.onSaved) this.onSaved.emit(this.model);
        if (this.formModal) this.formModal.hide();
    }
    show() {
        if (!this.prediction) {
            alert("You should select a prediction to challenge");
            return;
        }
        this.model = new Prediction();
        this.formModal.show();
    }
}