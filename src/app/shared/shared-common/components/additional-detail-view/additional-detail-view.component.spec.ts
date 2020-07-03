import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AdditionalDetailViewComponent } from './additional-detail-view.component';

describe('Rule additional detail view component tests', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalDetailViewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
});
