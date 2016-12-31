import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'optional-common',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss']
})
export class OptionalComponent implements OnInit {

  @Input('optionalGroup')
  optionalCommonForm: FormGroup;

  @Input()
  model: Object;

  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor() { }

  ngOnInit() {
    this.optionalCommonForm.controls['esHost'].setValue(this.model['ruleData']['es_host']);
    this.optionalCommonForm.controls['esPort'].setValue(this.model['ruleData']['es_port']);
    this.optionalCommonForm.controls['useSsl'].setValue(this.model['ruleData']['use_ssl'] as boolean);
    this.optionalCommonForm.controls['verifyCerts'].setValue(this.model['ruleData']['verify_certs'] as boolean);
    this.optionalCommonForm.controls['esUsername'].setValue(this.model['ruleData']['es_username']);
    this.optionalCommonForm.controls['esPassword'].setValue(this.model['ruleData']['es_password']);
    this.optionalCommonForm.controls['esUrlPrefix'].setValue(this.model['ruleData']['es_url_prefix']);
    this.optionalCommonForm.controls['esSendGetBodyAs'].setValue(this.model['ruleData']['es_send_get_body_as']);
    this.optionalCommonForm.controls['useStrFtimeIndex'].setValue(this.model['ruleData']['use_strftime_index'] as boolean);
    this.optionalCommonForm.controls['aggregation'].setValue(this.model['ruleData']['aggregation'] !== undefined ? this.model['ruleData']['aggregation']['minutes']: null);
    this.optionalCommonForm.controls['description'].setValue(this.model['ruleData']['description']);
    this.optionalCommonForm.controls['generateKibanaLink'].setValue(this.model['ruleData']['generate_kibana_link'] as boolean);
    this.optionalCommonForm.controls['useKibanaDashboard'].setValue(this.model['ruleData']['use_kibana_dashboard']);
    this.optionalCommonForm.controls['kibanaUrl'].setValue(this.model['ruleData']['kibana_url']);
    this.optionalCommonForm.controls['useKibana4Dashboard'].setValue(this.model['ruleData']['use_kibana4_dashboard']);
    this.optionalCommonForm.controls['kibana4StartTimeDelta'].setValue(this.model['ruleData']['kibana4_start_timedelta'] !== undefined ? this.model['ruleData']['kibana4_start_timedelta']['minutes'] : null);
    this.optionalCommonForm.controls['kibana4EndTimeDelta'].setValue(this.model['ruleData']['kibana4_end_timedelta'] !== undefined ? this.model['ruleData']['kibana4_end_timedelta']['minutes'] : null);
    this.optionalCommonForm.controls['useLocalTime'].setValue(this.model['ruleData']['use_local_time'] as boolean);
    this.optionalCommonForm.controls['realert'].setValue(this.model['ruleData']['realert'] !== undefined ? this.model['ruleData']['realert']['minutes'] : null);
    this.optionalCommonForm.controls['exponentialRealert'].setValue(this.model['ruleData']['exponential_realert'] !== undefined ? this.model['ruleData']['exponential_realert']['minutes'] : null);
    this.optionalCommonForm.controls['matchEnhancements'].setValue(this.model['ruleData']['match_enhancements'] !== undefined ? (this.model['ruleData']['match_enhancements'] as string[]).join(',') : null);
    this.optionalCommonForm.controls['topCountNumber'].setValue(this.model['ruleData']['top_count_number']);
    this.optionalCommonForm.controls['topCountKeys'].setValue(this.model['ruleData']['top_count_keys']);
    this.optionalCommonForm.controls['rawCountKeys'].setValue(this.model['ruleData']['raw_count_keys']);
    this.optionalCommonForm.controls['include'].setValue(this.model['ruleData']['include'] !== undefined ? (this.model['ruleData']['include'] as string[]).join(',') : null);
    this.optionalCommonForm.controls['maxQuerySize'].setValue(this.model['ruleData']['max_query_size']);
    this.optionalCommonForm.controls['queryDelay'].setValue(this.model['ruleData']['query_delay']);
    this.optionalCommonForm.controls['owner'].setValue(this.model['ruleData']['owner']);
    this.optionalCommonForm.controls['priority'].setValue(this.model['ruleData']['priority']);
    this.optionalCommonForm.controls['useCountQuery'].setValue(this.model['ruleData']['use_count_query'] as boolean);
    this.optionalCommonForm.controls['useTermsQuery'].setValue(this.model['ruleData']['use_terms_query'] as boolean);
    this.optionalCommonForm.controls['bufferTime'].setValue(this.model['ruleData']['buffer_time'] !== undefined ? this.model['ruleData']['buffer_time']['minutes'] : null);
    this.optionalCommonForm.controls['timestampType'].setValue(this.model['ruleData']['timestamp_type']);
    this.optionalCommonForm.controls['timestampFormat'].setValue(this.model['ruleData']['timestamp_format']);
    this.optionalCommonForm.controls['_sourceEnabled'].setValue(this.model['ruleData']['_source_enabled'] as boolean);

    this.bindControls();
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
  }

  private bindControls() {
    this.subscriptions.push(this.optionalCommonForm.controls['esHost'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_host'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['esPort'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_port'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useSsl'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_ssl'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['verifyCerts'].valueChanges.subscribe(val => {
      this.model['ruleData']['verify_certs'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['esUsername'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_username'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['esPassword'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_password'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['esUrlPrefix'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_url_prefix'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['esSendGetBodyAs'].valueChanges.subscribe(val => {
      this.model['ruleData']['es_send_get_body_as'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useStrFtimeIndex'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_strftime_index'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['aggregation'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['aggregation'] === undefined) {
        this.model['ruleData']['aggregation'] = { };
      }
      this.model['ruleData']['aggregation']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['description'].valueChanges.subscribe(val => {
      this.model['ruleData']['description'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['generateKibanaLink'].valueChanges.subscribe(val => {
      this.model['ruleData']['generate_kibana_link'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useKibanaDashboard'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_kibana_dashboard'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['kibanaUrl'].valueChanges.subscribe(val => {
      this.model['ruleData']['kibana_url'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useKibana4Dashboard'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_kibana4_dashboard'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['kibana4StartTimeDelta'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['kibana4_start_timedelta'] === undefined) {
        this.model['ruleData']['kibana4_start_timedelta'] = { };
      }
      this.model['ruleData']['kibana4_start_timedelta']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['kibana4EndTimeDelta'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['kibana4_end_timedelta'] === undefined) {
        this.model['ruleData']['kibana4_end_timedelta'] = { };
      }
      this.model['ruleData']['kibana4_end_timedelta']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useLocalTime'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_local_time'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['realert'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['realert'] === undefined) {
        this.model['ruleData']['realert'] = { };
      }
      this.model['ruleData']['realert']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['exponentialRealert'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['exponential_realert'] === undefined) {
        this.model['ruleData']['exponential_realert'] = { };
      }
      this.model['ruleData']['exponential_realert']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['matchEnhancements'].valueChanges.subscribe(val => {
      this.model['ruleData']['match_enhancements'] = (val as string).split(',');;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['topCountNumber'].valueChanges.subscribe(val => {
      this.model['ruleData']['top_count_number'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['topCountKeys'].valueChanges.subscribe(val => {
      this.model['ruleData']['top_count_keys'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useSsl'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_ssl'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['verifyCerts'].valueChanges.subscribe(val => {
      this.model['ruleData']['verify_certs'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['rawCountKeys'].valueChanges.subscribe(val => {
      this.model['ruleData']['raw_count_keys'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['include'].valueChanges.subscribe(val => {
      this.model['ruleData']['include'] = (val as string).split(',');
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['maxQuerySize'].valueChanges.subscribe(val => {
      this.model['ruleData']['max_query_size'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['queryDelay'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_delay'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['owner'].valueChanges.subscribe(val => {
      this.model['ruleData']['owner'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['priority'].valueChanges.subscribe(val => {
      this.model['ruleData']['priority'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useCountQuery'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_count_query'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['useTermsQuery'].valueChanges.subscribe(val => {
      this.model['ruleData']['use_terms_query'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['bufferTime'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['buffer_time'] === undefined) {
        this.model['ruleData']['buffer_time'] = { };
      }
      this.model['ruleData']['buffer_time']['minutes'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['timestampType'].valueChanges.subscribe(val => {
      this.model['ruleData']['timestamp_type'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['timestampFormat'].valueChanges.subscribe(val => {
      this.model['ruleData']['timestamp_format'] = val;
    }));
    this.subscriptions.push(this.optionalCommonForm.controls['_sourceEnabled'].valueChanges.subscribe(val => {
      this.model['ruleData']['_source_enabled'] = val;
    }));
  }
}
