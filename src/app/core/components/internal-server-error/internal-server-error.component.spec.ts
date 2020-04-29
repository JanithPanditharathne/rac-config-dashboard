import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InternalServerErrorComponent } from './internal-server-error.component';

import { CoreConstants } from '../../core.constants';

describe('Internal server error component tests', () => {
  let component: InternalServerErrorComponent;
  let fixture: ComponentFixture<InternalServerErrorComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternalServerErrorComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InternalServerErrorComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.all());
    htmlElement = debugElement.nativeElement.children[0];
  }));

  it('Should display internal server error status code', () => {
    component.errorStatus = CoreConstants.internal_server_error_status;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('h1'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(CoreConstants.internal_server_error_status);
  });

  it('Should display internal server error header', () => {
    component.errorHeading = CoreConstants.internal_server_error_message_heading;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-page-heading'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(CoreConstants.internal_server_error_message_heading);
  });

  it('Should display internal server error message', () => {
    component.errorHeading = CoreConstants.internal_server_error_message;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-page-message'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain(CoreConstants.internal_server_error_message);
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
