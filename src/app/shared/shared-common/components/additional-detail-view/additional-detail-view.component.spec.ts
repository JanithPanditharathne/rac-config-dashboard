import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AdditionalDetailViewComponent } from './additional-detail-view.component';

describe('Rule additional detail view component tests', () => {
  let fixture: ComponentFixture<AdditionalDetailViewComponent>;
  let component: AdditionalDetailViewComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalDetailViewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalDetailViewComponent);
    component = fixture.componentInstance;
  }));

  // describe('getDisplayName tests', () => {
  //   it('should return true when having placements', () => {
  //     expect(component.getDisplayName(RuleTabDisplayDataType.AgeAppropriation)).toBe(RuleTabDisplayDataType.AgeAppropriation);
  //   });
  //
  //   it('should return true when having placements', () => {
  //     expect(component.getDisplayName(RuleTabDisplayDataType.Formality)).toBe(RuleTabDisplayDataType.Occasion);
  //   });
  // });
});
