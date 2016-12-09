import { BaseFormComponent } from '../../shared/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';

export class RequiredBaseComponent extends BaseFormComponent {

  constructor(protected builder: FormBuilder ){
    super();
  }

  protected buildCommonForm() {
    return this.builder.group({
      esHost: ['', Validators.required],
      esPort: ['', Validators.required],
      index: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      alert: ['', Validators.required]
    })
  }
}
