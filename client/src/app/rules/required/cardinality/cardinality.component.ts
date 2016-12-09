import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequiredBaseComponent } from '../required.component-base';

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css']
})
export class CardinalityComponent extends RequiredBaseComponent implements OnInit {

  cardinalityForm: FormGroup;

  constructor(protected builder: FormBuilder) 
  { 
    super(builder);
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm(): void {
    this.cardinalityForm = this.builder.group({
      commonForm: this.buildCommonForm()
    });
  }
}
