/* tslint:disable:no-unused-variable */
/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: Client', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent
      ]
    });
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
