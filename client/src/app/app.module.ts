import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule, Http } from '@angular/http';
import { NavbarComponent } from './shared/navbar';
import { HomeComponent } from './home';
import { CollapseModule } from 'ng2-bootstrap';
import { GlobalConfigComponent } from './globalconfig/globalconfig.component';
import { EditComponent } from './rules/edit/edit.component';
import { CardinalityComponent } from './rules/cardinality/cardinality.component';
import { RequiredCommonComponent } from './rules/common/required/required.component';
import { AlertComponent } from './rules/alert/alert.component';
import { EmailComponent } from './rules/alert/email/email.component';
import { OptionalComponent } from './rules/common/optional/optional.component';
import { CreateComponent } from './rules/create/create.component';
import { AnyComponent } from './rules/any/any.component';
import { HipchatComponent } from './rules/alert/hipchat/hipchat.component';
import { AlertsComponent } from './rules/alerts/alerts.component';
import { ElastalertControlComponent } from './dashboard/elastalert-control/elastalert-control.component';

@NgModule({
    declarations: [
      AppComponent, 
      NavbarComponent,
      HomeComponent,
      GlobalConfigComponent,
      EditComponent,
      CardinalityComponent,
      RequiredCommonComponent,
      AlertComponent,
      EmailComponent,
      OptionalComponent,
      CreateComponent,
      AnyComponent,
      HipchatComponent,
      AlertsComponent,
      ElastalertControlComponent
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
        APP_ROUTER_PROVIDERS
    ],
    entryComponents: [CardinalityComponent, AnyComponent, AlertComponent, EmailComponent, HipchatComponent],
    bootstrap:    [AppComponent],
})
export class AppModule {}