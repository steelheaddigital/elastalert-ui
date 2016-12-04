import { Injectable } from '@angular/core';
import { BaseService, IJsendResponse, JsonRequest } from '../shared/base.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GLOBALCONFIG_PATH } from '../shared/api';

@Injectable()
export class GlobalConfigService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public getGlobalConfigData(): Observable<GlobalConfig> {
    return this.http.get(GLOBALCONFIG_PATH).map(result => {
        var response: IJsendResponse = super.extractData(result)
        let globalConfigData = response.data as GlobalConfig;
        return globalConfigData;
    });
  }

  public saveGlobalConfigData(config: GlobalConfig): Observable<boolean>{
    let request = super.BuildJsonRequest(config);

    return this.http.post(GLOBALCONFIG_PATH, request.body, request.options)
      .map(super.extractData)
      .map((res) => {
        let success = res.status === 'success';
        return success;
      })
      .catch(super.handleError);
}
}

export interface GlobalConfig {
  rules_folder: string;
  run_every: MinutesSetting;
  buffer_time: MinutesSetting;
  es_host: string;
  es_port: number;
  es_url_prefix: string;
  use_ssl: boolean;
  verify_certs: boolean;
  es_send_get_body_as: string;
  es_username: string;
  es_password: string;
  writeback_index: string;
  alert_time_limit: DaysSetting;
}

export interface MinutesSetting {
  minutes: number;
}

export interface DaysSetting {
  days: number;
}