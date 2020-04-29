import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from './action.component';

import { ActionType } from '../../../enums';

describe('Action bar component tests', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  describe('component class tests', () => {
    describe('#isUpdating tests', () => {
      it('Should return true when autoResolve and resolved both are false', () => {
        component.autoResolve = false;
        component.resolved = false;
        fixture.detectChanges();
        expect(component.isUpdating).toBeTruthy();
      });

      it('Should return false when one of autoResolve and resolved are true', () => {
        component.autoResolve = false;
        component.resolved = true;
        fixture.detectChanges();
        expect(component.isUpdating).toBeFalsy();
      });
    });

    describe('#actionIconCssClass tests', () => {
      it('Should return zmdi-spinner when autoResolve and resolved both are false', () => {
        component.autoResolve = false;
        component.resolved = false;
        fixture.detectChanges();
        expect(component.actionIconCssClass).toBe('zmdi-spinner');
      });

      it('Should return action type css class name when one of autoResolve and resolved are true', () => {
        component.autoResolve = false;
        component.resolved = true;
        const type = ActionType.ACTIVATE;
        component.type = type;
        fixture.detectChanges();
        expect(component.actionIconCssClass).toBe(type);
      });
    });

    describe('#onActionClick tests', () => {
      it('Should emit actionClickArgs function when action is clicked', () => {
        component.actionClick.subscribe(res => {
          expect(res).toBeDefined();
          res.resolve();
          expect(component.resolved).toBeTruthy();
        });
        component.onActionClick();
      });
    });
  });
});
