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
import { DynamicFormService, DynamicFormControlModel } from '@ng2-dynamic-forms/core';
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
    private dynamicFormModel: DynamicFormControlModel[];
    private pbDate: NgbDateStruct;
    private pbTime: NgbTimeStruct;
    private pbMinDate: NgbDateStruct
    private today: Date = new Date();
    searching = false;
    searchFailed = false;

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(600)
            .distinctUntilChanged()
            .do(() => this.searching = true)
            .switchMap(term =>
                this.categoryService.search(term)//.map(d => d.map(p => { return p.text }))
                    .do(() => this.searchFailed = false)
                    .catch(() => {
                        this.searchFailed = true;
                        return Observable.of([]);
                    }))
            .do(() => this.searching = false);
    formatter = (x: { text: string }) => x.text;
    constructor(private categoryService: CategoryService, private predictionService: PredictionService,
        private dynamicFormService: DynamicFormService) {

        //this.setYears();

        // let formCreator = new FormCreator(dynamicFormService);
        // this.formGroup = formCreator.createForm(PREDICT_FORM_MODEL);
        // this.dynamicFormModel = formCreator.createFormModel(PREDICT_FORM_MODEL);

    }
    // publishYearChanged() {
    //     let beginMonth = 1;
    //     if (this.publishYear) {
    //         if (this.publishYear === this.today.getFullYear()) {
    //             beginMonth = this.today.getMonth() + 1
    //         }
    //         for (let m = beginMonth; m <= 12; m++)
    //             this.publishMonths.push(m);
    //     }
    //     else {
    //         this.publishMonths = [];
    //     }
    // }
    // publishMonthChanged() {
    //     let beginDay = 1;
    //     let endDay = 30;
    //     if (this.publishMonth) {
    //         if (this.publishMonth === this.today.getMonth() + 1) {
    //             beginDay = this.today.getMonth() + 1
    //         }
    //         let thatDate = new Date(this.publishYear, this.publishMonth + 1, 0);
    //         endDay = thatDate.getDate();
    //         for (let m = beginDay; m <= endDay; m++)
    //             this.publishDays.push(m);
    //     }
    // }
    // setYears() {
    //     this.publishYears = Array(20).fill(this.today.getFullYear() - 1).map((x, i) => x + i)
    // }
    ngOnInit() {
        this.model = new Prediction();
    }
    publishTimeChanged(event) {
        this.model.publishDate = new Date(this.pbDate.year, this.pbDate.month, this.pbDate.day, event.hour, event.minute, event.second);
    }
    publishDateChanged(event: NgbDateStruct) {
        this.model.publishDate = new Date(event.year, event.month, event.day, this.pbTime ? this.pbTime.hour : 0, this.pbTime ? this.pbTime.minute : 0, this.pbTime ? this.pbTime.second : 0);
    }
    public show() {
        if (this.formModal) {
            this.today = new Date();
            this.pbMinDate = { day: this.today.getDate(), month: this.today.getMonth() + 1, year: this.today.getFullYear() }
            this.pbDate = { day: this.today.getDate(), month: this.today.getMonth() + 1, year: this.today.getFullYear() };
            this.pbTime = { hour: this.today.getHours(), minute: this.today.getMinutes(), second: 0 };
            this.formModal.show();
        }
    }
    public categoryOnSelect($event: TypeaheadMatch) {
        if (this.model) {
            this.model.category = $event.item.id;
            this.model.categoryText = $event.item.text;
        }
    }
    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public save() {
        this.predictionService.add(this.model);
        //if (this.onSaved) this.onSaved.emit(this.model);
        if (this.formModal) this.formModal.hide();
    }
}
