import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';

@Component({ 
  templateUrl: './multistep.step2.html',
    })

export class MultistepStep2Component extends MultistepFormClass implements OnInit, AfterViewChecked {
  
  @ViewChild('form') public latestForm: NgForm;

  constructor (
    @Inject(EditService) public multistepService: EditService
  ) { super(multistepService) }

  ngOnInit () {

    this.model = this.multistepService.model;

  }

}