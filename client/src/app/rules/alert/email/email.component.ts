import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  emailForm: FormGroup;
  email: FormControl;
  smtpHost: FormControl;
  smtpPort: FormControl;
  smtpSsl: FormControl;
  smtpAuthFile: FormControl;
  emailReplyTo: FormControl;
  fromAddr: FormControl;
  cc: FormControl;
  bcc: FormControl;
  
  subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input()
  model: Object;

  constructor(private builder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.email.setValue((this.model['ruleData']['email'] as string[]).join(','));
    this.smtpHost.setValue((this.model['ruleData']['smtp_host']));
    this.smtpPort.setValue((this.model['ruleData']['smtp_port']));
    this.smtpSsl.setValue((this.model['ruleData']['smtpSsl']));
    this.smtpAuthFile.setValue((this.model['ruleData']['smtp_auth_file']));
    this.emailReplyTo.setValue((this.model['ruleData']['email_reply_to']));
    this.fromAddr.setValue((this.model['ruleData']['from_addr']));
    this.cc.setValue((this.model['ruleData']['cc']));
    this.bcc.setValue((this.model['ruleData']['bcc']));
    
    this.bindControls();
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
  }

  private buildForm(): void {
    this.email = new FormControl('', Validators.required)
    this.smtpHost = new FormControl();
    this.smtpPort = new FormControl();
    this.smtpSsl = new FormControl();
    this.smtpAuthFile = new FormControl();
    this.emailReplyTo = new FormControl();
    this.fromAddr = new FormControl();
    this.cc = new FormControl();
    this.bcc = new FormControl();
    this.emailForm = this.builder.group({
      email: this.email,
      smtpHost: this.smtpHost,
      smtpPort: this.smtpPort,
      smtpSsl: this.smtpSsl,
      smtpAuthFile: this.smtpAuthFile,
      emailReplyTo: this.emailReplyTo,
      fromAddr: this.fromAddr,
      cc: this.cc,
      bcc: this.bcc
    });
  }

  private bindControls() {
    this.subscriptions.push(this.email.valueChanges.subscribe(val => {
      this.model['ruleData']['email'] = (val as string).split(',');
    }));
    this.subscriptions.push(this.smtpHost.valueChanges.subscribe(val => {
      this.model['ruleData']['smtp_host'] = val
    }));
    this.subscriptions.push(this.smtpPort.valueChanges.subscribe(val => {
      this.model['ruleData']['smtp_port'] = val
    }));
    this.subscriptions.push(this.smtpSsl.valueChanges.subscribe(val => {
      this.model['ruleData']['smtp_ssl'] = val
    }));
    this.subscriptions.push(this.smtpAuthFile.valueChanges.subscribe(val => {
      this.model['ruleData']['smtp_auth_file'] = val
    }));
    this.subscriptions.push(this.emailReplyTo.valueChanges.subscribe(val => {
      this.model['ruleData']['email_reply_to'] = val
    }));
    this.subscriptions.push(this.fromAddr.valueChanges.subscribe(val => {
      this.model['ruleData']['from_addr'] = val
    }));    
    this.subscriptions.push(this.cc.valueChanges.subscribe(val => {
      this.model['ruleData']['cc'] = val
    }));
    this.subscriptions.push(this.bcc.valueChanges.subscribe(val => {
      this.model['ruleData']['bcc'] = val
    }));
  }

}
