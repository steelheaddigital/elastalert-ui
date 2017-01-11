/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { routing, APP_ROUTER_PROVIDERS } from '../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  class MockRouter {
    public currentPath: string

    public navigate(path) {
      this.currentPath = path
    }
  }
  let mockRouter = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SidebarComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
