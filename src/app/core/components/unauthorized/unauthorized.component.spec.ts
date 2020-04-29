import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized.component';

import { CoreConstants } from '../../core.constants';

describe('Unauthorized component tests', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizedComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponent);

    component = fixture.componentInstance;
  }));

  it('Should display Unauthorized', () => {
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('h1'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain('Unauthorized');
  });

  it('Should display help text', () => {
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-page-heading'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(CoreConstants.unauthorized_error_message);
    expect(htmlElement.textContent).toContain(CoreConstants.unauthorized_route_message);
    expect(htmlElement.textContent).toContain(CoreConstants.unauthorized_redirect_path);
  });

  it('should go to url', async(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();
      fixture.debugElement.query(By.css('a')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/');
      });
    })
  ));
});
