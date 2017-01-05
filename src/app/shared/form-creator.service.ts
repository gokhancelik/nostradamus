import {
    DynamicFormControlModel,
    DynamicFormService, DynamicInputModel
} from '@ng2-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

export class FormCreator {
    /**
     *
     */
    constructor(private dynamicFormService: DynamicFormService) {
    }
    public createForm(properties: Array<DynamicFormControlModel>): FormGroup {
        let dynamicFormModel: Array<DynamicFormControlModel> = this.createFormModel(properties);
        let form = this.dynamicFormService.createFormGroup(dynamicFormModel);
        return form;
    }
    public createFormModel(properties: Array<DynamicFormControlModel>):
        Array<DynamicFormControlModel> {
        let inputArray = new Array<DynamicFormControlModel>();
        for (let i = 0; i < properties.length; i++) {
            let p = properties[i];
            inputArray.push(properties[i]);
        }
        return inputArray;
    }
}
