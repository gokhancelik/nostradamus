import { PredictionService } from './../shared/services/prediction.service';
import { Prediction } from './../shared/models/prediction.model';
import { FormGroup } from '@angular/forms';
import { FormCreator } from './../shared/form-creator.service';
// import { PREDICT_FORM_MODEL } from './prediction-form.model';
import { Category } from './../shared/models/category.model';
import { CategoryService } from './../shared/services/category.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadMatch } from 'ng2-bootstrap/ng2-bootstrap';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'prediction-add',
    templateUrl: 'form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PredictionAddComponent implements OnInit {
    @ViewChild('formModal') public formModal: ModalDirective;
    @Output() public onSaved: EventEmitter<any> = new EventEmitter();
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;
    public categoryDataSource: Observable<Category[]>;
    protected formGroup: FormGroup;
    private model: Prediction;
    private categoryResult: any;
    private pbDate: NgbDateStruct;
    private pbTime: NgbTimeStruct;
    private pbMinDate: NgbDateStruct
    private haDate: NgbDateStruct;
    private haTime: NgbTimeStruct;
    private today: Date = new Date();
    categories: Category[];
    searching = false;
    searchFailed = false;

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.categories.filter(v => new RegExp(term, 'gi').test(v.text)).slice(0, 10));
    // formatter(x: { text: string }) {
    //     return x.text || x;
    // }
    constructor(private categoryService: CategoryService, private predictionService: PredictionService) {
        this.categoryService.search().subscribe(
            data => this.categories = data
        );
    }
    ngOnInit() {
        this.model = new Prediction();
    }
    publishTimeChanged(event: NgbTimeStruct) {
        this.model.publishDate = new Date(this.pbDate.year, this.pbDate.month, this.pbDate.day, event.hour, event.minute, event.second);
    }
    publishDateChanged(event: NgbDateStruct) {
        this.model.publishDate = new Date(event.year, event.month - 1, event.day, this.pbTime ? this.pbTime.hour : 0, this.pbTime ? this.pbTime.minute : 0, this.pbTime ? this.pbTime.second : 0);
    }
    hideAfterDateChanged(event: NgbDateStruct) {
        this.model.hideDate = new Date(event.year, event.month - 1, event.day, this.haTime ? this.haTime.hour : 0, this.haTime ? this.haTime.minute : 0, this.haTime ? this.haTime.second : 0);
    }
    hideAfterTimeChanged(event: NgbTimeStruct) {
        this.model.hideDate = new Date(this.haDate.year, this.haDate.month, this.haDate.day, event.hour, event.minute, event.second);
    }
    public show() {
        if (this.formModal) {
            this.today = new Date();
            this.pbMinDate = { day: this.today.getDate(), month: this.today.getMonth() + 1, year: this.today.getFullYear() }
            this.pbDate = this.haDate = { day: this.today.getDate(), month: this.today.getMonth() + 1, year: this.today.getFullYear() };
            this.pbTime = this.haTime = { hour: this.today.getHours(), minute: this.today.getMinutes(), second: 0 };
            this.formModal.show();
        }
    }
    public categoryOnSelect($event: TypeaheadMatch) {
        // if (this.model) {
        //     this.model.category = $event.item.id;
        // }
    }
    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public save() {
        if (!this.categoryResult) {
            alert("You should enter a category");
            return;
        }
        if (!(this.model.hideDate.getTime() < this.model.publishDate.getTime())) {
            alert("Hide date can not be later than publish date");
            return;
        }
        if (this.categoryResult.text) {
            // this.model.category = this.categoryResult.id;
            this.predictionService.predict(this.model, this.categoryResult.text);
        }
        else {
            this.predictionService.predict(this.model, this.categoryResult);
        }
        //if (this.onSaved) this.onSaved.emit(this.model);
        if (this.formModal) this.formModal.hide();
    }
}
