import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input('group') 
  emailForm: FormGroup;

  @Input()
  model: Object;

  constructor(private builder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit() {
    
  }

  private buildForm(): void {
    this.emailForm = this.builder.group({
      email: ['', Validators.required]
    });
  }

}
