import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';

@Component({ 
  templateUrl: './multistep.step1.html',
})

export class MultistepStep1Component extends MultistepFormClass implements OnInit, AfterViewChecked {
  
  @ViewChild('form') public latestForm: NgForm;
  public rules: string[];

  constructor (
    @Inject(EditService) public multistepService: EditService
  ) { super(multistepService) }

  ngOnInit () {
    this.model = this.multistepService.model;
    this.multistepService.ruleNames().subscribe(result => {
      this.rules = result;
    })
  }

}