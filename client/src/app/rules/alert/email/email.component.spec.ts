/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmailComponent } from './email.component';
import * as Rx from 'rxjs';


describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let model = {
      ruleData: {
          email: ['test@test.com', 'test2@test.com'],
          smtp_host: 'testSmtpHost',
          smtp_port: 123,
          smtp_ssl: true,
          smtp_auth_file: 'testSmtpAuthFile',
          email_reply_to: 'testEmailReplyTo',
          from_addr: 'testFromAddr',
          cc: 'testCc',
          bcc: 'testBcc'
      }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailComponent],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.email.value).toEqual('test@test.com,test2@test.com');
    expect(component.smtpHost.value).toEqual('testSmtpHost');
    expect(component.smtpPort.value).toEqual(123);
    expect(component.smtpSsl.value).toEqual(true);
    expect(component.smtpAuthFile.value).toEqual('testSmtpAuthFile');
    expect(component.emailReplyTo.value).toEqual('testEmailReplyTo');
    expect(component.fromAddr.value).toEqual('testFromAddr');
    expect(component.cc.value).toEqual('testCc');
    expect(component.bcc.value).toEqual('testBcc');
  });
  
  it('should update model email on change', () => {
      component.email.setValue('test3@test.com');
      expect(component.model['ruleData']['email']).toEqual(['test3@test.com']);
  });

  it('should update model smtp_host on change', () => {
      component.smtpHost.setValue('newSmtpHost');
      expect(component.model['ruleData']['smtp_host']).toEqual('newSmtpHost');
  });

  it('should update model smtp_port on change', () => {
      component.smtpPort.setValue(456);
      expect(component.model['ruleData']['smtp_port']).toEqual(456);
  });

  it('should update model smtp_ssl on change', () => {
      component.smtpSsl.setValue(false);
      expect(component.model['ruleData']['smtp_port']).toEqual(456);
  });

  it('should update model smtp_ssl on change', () => {
      component.smtpAuthFile.setValue('newSmtpAuthFile');
      expect(component.model['ruleData']['smtp_auth_file']).toEqual('newSmtpAuthFile');
  });

  it('should update model email_reply_to on change', () => {
      component.emailReplyTo.setValue('newEmailReplyTo');
      expect(component.model['ruleData']['email_reply_to']).toEqual('newEmailReplyTo');
  });

  it('should update model from_addr on change', () => {
      component.fromAddr.setValue('newFromAddr');
      expect(component.model['ruleData']['from_addr']).toEqual('newFromAddr');
  });

  it('should update model cc on change', () => {
      component.cc.setValue('newCc');
      expect(component.model['ruleData']['cc']).toEqual('newCc');
  });

  it('should update model bcc on change', () => {
      component.bcc.setValue('newBcc');
      expect(component.model['ruleData']['bcc']).toEqual('newBcc');
  });
});
