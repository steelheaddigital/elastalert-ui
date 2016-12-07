import { NgForm } from '@angular/forms';
import { MultistepService } from '../../shared/multistep/multistep.service';

export class MultistepFormClass {

  public model = {};
  private form: NgForm;
  public latestForm: NgForm;

  constructor(public multistepService: MultistepService) { }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {

   if (!this.latestForm) return;

    if (this.latestForm === this.form) return;;

    this.form = this.latestForm;
    
    if (this.form)
      this.form.valueChanges
        .subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data?: any) {

    if (!this.form) return;
    const form = this.form.form;

    for (const field in this.formErrors) {

      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      console.log(control); 

      this.multistepService.stateUpdateStream.next({dirty: true, isValid: control && control.valid});

      if (control && control.dirty && !control.valid) {



      }
    }
  }

  formErrors = {

    'name': '' 
    
  };

}