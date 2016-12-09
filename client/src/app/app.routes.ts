import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { GlobalConfigComponent } from './globalconfig/index';
import { EditComponent } from './rules/edit/edit.component';
import { EditStep1Component } from './rules/edit/step1.component';
import { EditStep2Component } from './rules/edit/step2.component';

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
    component: EditComponent,
    children: [
      {
        path: 'step1',
        component: EditStep1Component
      },
      {
        path: 'step2',
        component: EditStep2Component
      }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [

];

export const routing = RouterModule.forRoot(routes)