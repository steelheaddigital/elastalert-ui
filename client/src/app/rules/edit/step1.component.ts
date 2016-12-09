import { Component, OnInit, Inject, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';

@Component({ 
  templateUrl: './step1.component.html',
})

export class EditStep1Component extends MultistepFormClass implements OnInit, AfterViewChecked {
  
  public rules: string[];

  constructor (public multistepService: EditService) 
  { 
    super(multistepService) 
  }

  ngOnInit () {
    this.model = this.multistepService.model;
    this.multistepService.ruleNames().subscribe(result => {
      this.rules = result;
    })
  }

}