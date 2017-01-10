import { Component, OnInit, Input , ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
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

  public childComponentRef: ComponentRef<any>;

  public alertTypes: string[] = [
    "email",
    "hipchat"
  ]

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    while(true) {
      if(this.alertParent) {
        let alertType = this.alertForm.controls['type'].value;
        this.loadAlert(alertType);
      }
      break;
    }

    this.alertForm.controls['type'].valueChanges.subscribe(type => { 
      this.loadAlert(type);
    });
  }

  private loadAlert(alertType: string){
    let childComponent = this.resolveAlertTypeComponent(alertType);
    if(childComponent) {
      this.alertParent.clear();
      this.childComponentRef = this.alertParent.createComponent(childComponent);
      this.childComponentRef.instance.model = this.model;
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
