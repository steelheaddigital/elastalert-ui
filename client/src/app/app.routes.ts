import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { GlobalConfigComponent } from './globalconfig/index';
import { EditComponent } from './rules/edit/edit.component';
import { CreateComponent } from './rules/create/create.component';

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
  },
  {
    path: 'rules/edit',
    component: EditComponent
  }
  ,
  {
    path: 'rules/create',
    component: CreateComponent
  }
];

export const APP_ROUTER_PROVIDERS = [

];

export const routing = RouterModule.forRoot(routes)