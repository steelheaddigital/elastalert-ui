import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { GlobalConfigComponent } from './globalconfig/index';
import { EditComponent } from './rules/edit/edit.component';
import { MultistepStep1Component } from './rules/edit/multistep.step1.component';
import { MultistepStep2Component } from './rules/edit/multistep.step2.component';

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
        component: MultistepStep1Component
      },
      {
        path: 'step2',
        component: MultistepStep2Component
      }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [

];

export const routing = RouterModule.forRoot(routes)