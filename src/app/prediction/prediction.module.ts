import { PredictionListComponent } from './prediction.list.component';
import { PredictionAddComponent } from './prediction.add.component';
import { PredictButtonComponent } from './prediction.button.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule, ModalModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { PredictionComponent } from './prediction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import {
    DynamicFormsCoreModule,
    DynamicFormService, DynamicFormRelationService
} from '@ng2-dynamic-forms/core';

import { DynamicFormsBootstrapUIModule } from '@ng2-dynamic-forms/ui-bootstrap';

@NgModule({
    imports: [DynamicFormsCoreModule, DynamicFormsBootstrapUIModule, DropdownModule,
        ModalModule.forRoot(), CommonModule, NgbModule.forRoot(),
        TypeaheadModule, ReactiveFormsModule, FormsModule, MomentModule],
    exports: [PredictButtonComponent, PredictionListComponent],
    declarations: [PredictionComponent, PredictionAddComponent, PredictButtonComponent, PredictionListComponent],
    providers: [DynamicFormService, DynamicFormRelationService],
})
export class PredictionModule { }
