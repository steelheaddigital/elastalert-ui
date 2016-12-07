import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MultistepService, IState, IStepDirection } from '../../shared/multistep/multistep.service';
import { EditService } from './edit.service';
import { MultistepComponentBase } from '../../shared/multistep/multistep.component-base';

@Component({
  templateUrl: './edit.component.html',
  providers: [EditService]
}) 

export class EditComponent extends MultistepComponentBase implements OnInit { 
  constructor (
    @Inject(Router) public router: Router,
    @Inject(EditService) private editService: MultistepService
  ) 
  { 
      super(router, editService)
  }
}