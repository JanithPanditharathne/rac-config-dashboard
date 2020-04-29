import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';

import { AppMainComponent } from './main.component';

import { BsModalService } from 'ngx-bootstrap/modal';

const mockUrl = 'test/url/1';

const MockActivatedRoute = {
  data: of({
    profile: ''
  })
};

class MockRouter {
  readonly url: string = mockUrl;
}

describe('Main component tests', () => {
  let component: AppMainComponent;
  let fixture: ComponentFixture<AppMainComponent>;
  let debugElement: DebugElement;

  let mockBsModalService;
  let bsModalService: BsModalService;

  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    mockBsModalService = {
      show: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [AppMainComponent],
      providers: [
        { provide: BsModalService, useValue: mockBsModalService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: MockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppMainComponent);

    component = fixture.componentInstance;

    bsModalService = TestBed.get(BsModalService);
    spyOn(bsModalService, 'show');

    activatedRoute = TestBed.get(ActivatedRoute);
    spyOn(activatedRoute.data, 'subscribe').and.callThrough();

    router = TestBed.get(Router);
    // spyOn(router, 'url').and.callThrough();
  }));

  it('should invoke #show of bsModalService when logout event is triggered', () => {
    debugElement = fixture.debugElement.query(By.css('.menu'));
    debugElement.triggerEventHandler('logout', null);
    expect(bsModalService.show).toHaveBeenCalled();
  });

  it('should return the url when #getState is invoked', () => {
    expect(component.getState()).toEqual(mockUrl);
  });
});
