import { FormGroup } from '@angular/forms';

export class BaseFormComponent {
  protected errorMessage: string
  protected serverValidations: Object;

  protected handleError(form: FormGroup, error: any) {
    if(error.status === 'fail'){
      for (let propertyName of Object.keys(error.data)) {
        let formProperty = form.get(propertyName);
        formProperty.setErrors({'serverValidation': true});
      }
      this.serverValidations = error.data;
    } else {
      this.errorMessage = error.message
    }
  }
}

export interface ValidationResult {
  [key:string]:boolean;
}