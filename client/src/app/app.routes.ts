import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { GlobalConfigComponent } from './globalconfig/index';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'globalconfig',
    component: GlobalConfigComponent
  }
];

export const APP_ROUTER_PROVIDERS = [

];

export const routing = RouterModule.forRoot(routes)