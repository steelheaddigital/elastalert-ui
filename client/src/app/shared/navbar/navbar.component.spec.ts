/* tslint:disable:no-unused-variable */
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from './navbar.component';

let td = require('testdouble');

describe('Component: Navbar', () => {
  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }
  let mockRouter = new MockRouter();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        {
          provide: Router, 
          useValue: mockRouter
        }
      ]
    }));

  it('should create an instance', () => {
    inject([Router],(router: Router) => {
      let mockService: AuthService = td.object(AuthService);
      let component = new NavbarComponent(mockService, router)

      expect(component).toBeTruthy();
    })
  });

  describe('isLoggedIn method', () => {
    it('should return true if user is logged in', 
      inject([Router],(router: Router) => {
        let mockService: AuthService = td.object(AuthService);
        td.when(mockService.isLoggedIn()).thenReturn(true);
        let component = new NavbarComponent(mockService, router)

        let result: boolean = component.isLoggedIn();

        expect(result).toBe(true);
      })
    )

    it('should return false if user is not logged in', 
      inject([Router],(router: Router) => {
        let mockService: AuthService = td.object(AuthService);
        td.when(mockService.isLoggedIn()).thenReturn(false);
        let component = new NavbarComponent(mockService, router)

        let result: boolean = component.isLoggedIn();

        expect(result).toBe(false);
      })
    )
  })

  describe('logout method', () => {
    it('logs out user and navigates to home page',
      inject([Router],(router: Router) => {
          let mockService: AuthService = td.object(AuthService);
          let component = new NavbarComponent(mockService, router)
          let logoutEvent: Event = new Event('test')

          component.logout(logoutEvent);

          td.verify(mockService.logout());
          expect(mockRouter.currentPath[0]).toEqual('./home')
      })
    )
  })
});
