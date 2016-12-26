import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'optional-common',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss']
})
export class OptionalComponent implements OnInit {

  @Input('optionalGroup')
  optionalCommonForm: FormGroup;

  @Input()
  model: Object;

  constructor() { }

  ngOnInit() {
  }

}
