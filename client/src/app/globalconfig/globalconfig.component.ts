import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalConfigService, GlobalConfig } from './globalconfig.service';
import { BaseFormComponent, ValidationResult } from '../shared/base-form.component'

@Component({
  selector: 'app-globalconfig',
  templateUrl: './globalconfig.component.html',
  styleUrls: ['./globalconfig.component.scss']
})
export class GlobalConfigComponent extends BaseFormComponent implements OnInit {
  globalConfigData: GlobalConfig;
  globalConfigForm: FormGroup;
  rulesFolder: FormControl;
  runEvery: FormControl;
  bufferTime: FormControl;
  esHost: FormControl;
  esPort: FormControl;
  esUrlPrefix: FormControl;
  useSsl: FormControl;
  verifyCerts: FormControl;
  esSendBodyAs: FormControl;
  esUserName: FormControl;
  esPassword: FormControl;
  writebackIndex: FormControl;
  alertTimeLimitDays: FormControl;
  
  constructor(private builder: FormBuilder, private globalConfigService: GlobalConfigService) {
      super()
      this.buildForm();
  }

  ngOnInit() {
    this.globalConfigService.getGlobalConfigData().subscribe(result => {
      this.globalConfigData = result;
      this.rulesFolder.setValue(this.globalConfigData.rules_folder);
      this.runEvery.setValue(this.globalConfigData.run_every.minutes);
      this.bufferTime.setValue(this.globalConfigData.buffer_time.minutes);
      this.esHost.setValue(this.globalConfigData.es_host);
      this.esPort.setValue(this.globalConfigData.es_port);
      this.esUrlPrefix.setValue(this.globalConfigData.es_url_prefix);
      this.useSsl.setValue(this.globalConfigData.use_ssl as boolean);
      this.verifyCerts.setValue(this.globalConfigData.verify_certs as boolean);
      this.esSendBodyAs.setValue(this.globalConfigData.es_send_get_body_as);
      this.esUserName.setValue(this.globalConfigData.es_username);
      this.esPassword.setValue(this.globalConfigData.es_password);
      this.writebackIndex.setValue(this.globalConfigData.writeback_index);
      this.alertTimeLimitDays.setValue(this.globalConfigData.alert_time_limit.days);
    })
  }

  save(): void {
    let globalConfig: GlobalConfig = {
      rules_folder: this.rulesFolder.value,
      run_every: { 
        minutes: this.runEvery.value
      },
      buffer_time: {
        minutes: this.bufferTime.value
      },
      es_host: this.esHost.value,
      es_port: this.esPort.value,
      es_url_prefix: this.esUrlPrefix.value,
      use_ssl: this.useSsl.value,
      verify_certs: this.verifyCerts.value,
      es_send_get_body_as: this.esSendBodyAs.value,
      es_username: this.esUserName.value,
      es_password: this.esPassword.value,
      writeback_index: this.writebackIndex.value,
      alert_time_limit: {
        days: this.alertTimeLimitDays.value
      }
    }

    this.globalConfigService.saveGlobalConfigData(globalConfig)
      .subscribe(
        result => {
          alert("Global Config Successfully Saved")
        },
        error => {
          super.handleError(this.globalConfigForm, error);
        })
  }

  private buildForm(): void {
      this.rulesFolder = new FormControl('', Validators.required);
      this.runEvery = new FormControl('', Validators.required);
      this.bufferTime = new FormControl('', Validators.required);
      this.esHost = new FormControl('', Validators.required);
      this.esPort = new FormControl('', Validators.required);
      this.esUrlPrefix = new FormControl();
      this.useSsl = new FormControl();
      this.verifyCerts = new FormControl();
      this.esSendBodyAs = new FormControl();
      this.esUserName = new FormControl();
      this.esPassword = new FormControl();
      this.writebackIndex = new FormControl('', Validators.required);
      this.alertTimeLimitDays = new FormControl('', Validators.required);
      this.globalConfigForm = this.builder.group({
          rulesFolder: this.rulesFolder,
          runEvery: this.runEvery,
          bufferTime: this.bufferTime,
          esHost: this.esHost,
          esPort: this.esPort,
          esUrlPrefix: this.esUrlPrefix,
          useSsl: this.useSsl,
          verifyCerts: this.verifyCerts,
          esSendBodyAs: this.esSendBodyAs,
          esUserName: this.esUserName,
          esPassword:this.esPassword,
          writebackIndex: this.writebackIndex,
          alertTimeLimitDays: this.alertTimeLimitDays
      });
  }
}
