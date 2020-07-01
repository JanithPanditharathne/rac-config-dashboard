import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let fixture: ComponentFixture<AppMainComponent>;
  let debugElement: DebugElement;

  let mockBsModalService;
  let bsModalService: BsModalService;

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

    bsModalService = TestBed.get(BsModalService);
    spyOn(bsModalService, 'show');

    activatedRoute = TestBed.get(ActivatedRoute);
    spyOn(activatedRoute.data, 'subscribe').and.callThrough();
  }));
});
