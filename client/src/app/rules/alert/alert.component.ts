import { Component, OnInit, Input , ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmailComponent } from './email/email.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input('group') 
  alertForm: FormGroup;

  @Input()
  model: Object;

  @ViewChild('alertParent', {read: ViewContainerRef})
  alertParent: ViewContainerRef;

  public alertTypes: string[] = [
    "email",
  ]

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    setTimeout(() => {
      while(true) {
        if(this.alertParent) {
          let alertType = this.alertForm.controls['type'].value;
          let childComponent = this.resolveAlertTypeComponent(alertType);
          let componentRef = this.alertParent.createComponent(childComponent);
          componentRef.instance.model = this.model;
        }
        break;
      }
    }, 1);
  }

  private resolveAlertTypeComponent(alertType: string): ComponentFactory<any> {
    switch (alertType) {
      case 'email':
        return this.componentFactoryResolver.resolveComponentFactory(EmailComponent);
      default:
        return null;
    }
  }

}
