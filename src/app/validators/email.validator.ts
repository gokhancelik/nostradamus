import { AbstractControl } from '@angular/forms';
export class EmailValidator {

  public static validate = emailValidator;
}
export function emailValidator(c: AbstractControl) {
  let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return EMAIL_REGEXP.test(c.value) ? null : {
    emailValidator: {
      valid: false
    }
  };
};

