import { Component, OnInit, Input , ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmailComponent } from './email/email.component';
import { HipchatComponent } from './hipchat/hipchat.component';

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
    "hipchat"
  ]

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    setTimeout(() => {
      while(true) {
        if(this.alertParent) {
          let alertType = this.alertForm.controls['type'].value;
          this.loadAlert(alertType);
        }
        break;
      }
    }, 1);

    this.alertForm.controls['type'].valueChanges.subscribe(type => { 
      this.loadAlert(type);
    });
  }

  public loadAlert(alertType: string){
    let childComponent = this.resolveAlertTypeComponent(alertType);
    if(childComponent) {
      this.alertParent.clear();
      let componentRef = this.alertParent.createComponent(childComponent);
      componentRef.instance.model = this.model;
    }
  }

  private resolveAlertTypeComponent(alertType: string): ComponentFactory<any> {
    switch (alertType) {
      case 'email':
        return this.componentFactoryResolver.resolveComponentFactory(EmailComponent);
      case 'hipchat':
        return this.componentFactoryResolver.resolveComponentFactory(HipchatComponent);
      default:
        return null;
    }
  }

}
