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
import { EditStep1Component } from './rules/edit/step1.component';
import { EditStep2Component } from './rules/edit/step2.component';
import { CardinalityComponent } from './rules/required/cardinality/cardinality.component';
import { CommonComponent } from './rules/required/common/common.component';

@NgModule({
    declarations: [
      AppComponent, 
      NavbarComponent,
      HomeComponent,
      GlobalConfigComponent,
      EditComponent,
      EditStep1Component,
      EditStep2Component,
      CardinalityComponent,
      CommonComponent
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
    entryComponents: [EditStep2Component, CardinalityComponent],
    bootstrap:    [AppComponent],
})
export class AppModule {}