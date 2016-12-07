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
import { MultistepStep1Component } from './rules/edit/multistep.step1.component';
import { MultistepStep2Component } from './rules/edit/multistep.step2.component';

@NgModule({
    declarations: [
      AppComponent, 
      NavbarComponent,
      HomeComponent,
      GlobalConfigComponent,
      EditComponent,
      MultistepStep1Component,
      MultistepStep2Component
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
    bootstrap:    [AppComponent],
})
export class AppModule {}