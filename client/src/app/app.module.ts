import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule, Http } from '@angular/http';
import { SidebarComponent } from './shared/sidebar';
import { HomeComponent } from './home';
import { CollapseModule } from 'ng2-bootstrap';
import { GlobalConfigComponent } from './globalconfig/globalconfig.component';
import { EditComponent } from './rules/edit/edit.component';
import { CardinalityComponent } from './rules/cardinality/cardinality.component';
import { RequiredCommonComponent } from './rules/common/required/required.component';
import { AlertComponent } from './rules/alert/alert.component';
import { EmailComponent } from './rules/alert/email/email.component';
import { OptionalCommonComponent } from './rules/common/optional/optional.component';
import { CreateComponent } from './rules/create/create.component';
import { AnyComponent } from './rules/any/any.component';
import { HipchatComponent } from './rules/alert/hipchat/hipchat.component';
import { AlertsComponent } from './rules/alerts/alerts.component';
import { ElastalertControlComponent } from './dashboard/elastalert-control/elastalert-control.component';
import { GlobalConfigService } from './globalconfig/globalconfig.service';
import { ElastalertControlService } from './dashboard/elastalert-control/elastalert-control.service';
import { RulesService } from './rules/rules.service';
import { BlacklistComponent } from './rules/blacklist/blacklist.component';
import { WhitelistComponent } from './rules/whitelist/whitelist.component';
import { ChangeComponent } from './rules/change/change.component';
import { FrequencyComponent } from './rules/frequency/frequency.component';
import { SpikeComponent } from './rules/spike/spike.component';
import { FlatlineComponent } from './rules/flatline/flatline.component';
import { NewTermComponent } from './rules/new-term/new-term.component';
import { ElastalertStatusComponent } from './dashboard/elastalert-status/elastalert-status.component';
import { ElastalertStatusService } from './dashboard/elastalert-status/elastalert-status.service';
import { ElastalertAlertsComponent } from './dashboard/elastalert-alerts/elastalert-alerts.component';
import { ElastalertAlertsService } from './dashboard/elastalert-alerts/elastalert-alerts.service';

@NgModule({
    declarations: [
      AppComponent, 
      SidebarComponent,
      HomeComponent,
      GlobalConfigComponent,
      EditComponent,
      CardinalityComponent,
      RequiredCommonComponent,
      AlertComponent,
      EmailComponent,
      OptionalCommonComponent,
      CreateComponent,
      AnyComponent,
      HipchatComponent,
      AlertsComponent,
      ElastalertControlComponent,
      ElastalertStatusComponent,
      BlacklistComponent,
      WhitelistComponent,
      ChangeComponent,
      FrequencyComponent,
      SpikeComponent,
      FlatlineComponent,
      NewTermComponent,
      ElastalertAlertsComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CollapseModule,
        routing
    ],
    providers: [
        APP_ROUTER_PROVIDERS,
        GlobalConfigService,
        ElastalertControlService,
        ElastalertStatusService,
        RulesService,
        ElastalertAlertsService
    ],
    entryComponents: [
        CardinalityComponent, 
        AnyComponent, 
        BlacklistComponent, 
        WhitelistComponent,
        FrequencyComponent,
        SpikeComponent,
        FlatlineComponent,
        NewTermComponent,
        ChangeComponent,
        AlertComponent, 
        EmailComponent,
        HipchatComponent
    ],
    bootstrap: [
      AppComponent
    ],
})
export class AppModule {}