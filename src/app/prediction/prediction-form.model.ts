import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicOptionControlModel,
    DynamicTextAreaModel,
    DynamicRadioGroupModel
} from '@ng2-dynamic-forms/core';

export const PREDICT_FORM_MODEL: Array<DynamicFormControlModel> = [

    new DynamicTextAreaModel({
        id: 'text',
        label: 'Prediction',
        maxLength: 500,
        placeholder: 'Prediction',
        required: true,
        errorMessages: {
            required: '{{label}} is required.',
            maxLength: '{{label}} should be 500 characters.',
        }
    })
];