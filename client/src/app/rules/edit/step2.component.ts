import { Component, OnInit, AfterViewChecked, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';
import { CardinalityComponent } from '../required/cardinality/cardinality.component';

@Component({
  templateUrl: './step2.component.html',
})

export class EditStep2Component extends MultistepFormClass implements OnInit, AfterViewChecked {

  @ViewChild('parent', {read: ViewContainerRef})
  parent: ViewContainerRef;

  constructor (public multistepService: EditService, private componentFactoryResolver: ComponentFactoryResolver) 
  { 
    super(multistepService);
    
    const childComponent = componentFactoryResolver.resolveComponentFactory(CardinalityComponent);

    setTimeout(() => {
      while(true) {
        if(this.parent) {
          this.parent.createComponent(childComponent);
          break;
        }
      }
    }, 1);
  }

  ngOnInit () {
    this.model = this.multistepService.model;
  }
}