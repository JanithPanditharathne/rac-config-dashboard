import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LogoutConfirmPopupComponent } from './logout-confirm-popup.component';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalRefService } from 'ornamentum';
import { MainConstants } from '../../main.constants';
import { of } from "rxjs";
import { UserProfileService } from "../../../core/services";

const mockUserProfileService  = {
  showLogoutConfirm: false,

  getUserProfile: () => {
    return of({
      userGroupId: 1,
      userGroup: 'ss',
      userId: 'ss'
    });
  },

  getLogoutPopupStatus:() => {
    return true
  },

  setLogoutPopupStatus: (status)=> {
    mockUserProfileService.showLogoutConfirm = status;
  }
};

describe('Logout confirm popup component tests', () => {
  let component: LogoutConfirmPopupComponent;
  let fixture: ComponentFixture<LogoutConfirmPopupComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let mockModalRef;
  let modalRef: BsModalRef;

  let mockglobalRefService;
  let globalRefService: GlobalRefService;
  let userProfileService: UserProfileService;

  beforeEach(async(() => {
    mockModalRef = {
      hide: () => {}
    };

    mockglobalRefService = {
      window: {
        location: {
          href: {}
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [LogoutConfirmPopupComponent],
      providers: [
        { provide: UserProfileService, useValue: mockUserProfileService },
        { provide: BsModalRef, useValue: mockModalRef },
        { provide: GlobalRefService, useValue: mockglobalRefService }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutConfirmPopupComponent);

    component = fixture.componentInstance;
    modalRef = TestBed.get(BsModalRef);
    globalRefService = TestBed.get(GlobalRefService);
    spyOn(modalRef, 'hide');

    userProfileService = TestBed.get(UserProfileService);
    spyOn(userProfileService, 'getUserProfile').and.callThrough();



  }));
  // it('ngOnInit need to initialize ', () => {
  //   component.ngOnInit();
  // });
  // it('should display modal title', () => {
  //   debugElement = fixture.debugElement.query(By.css('.modal-title'));
  //   htmlElement = debugElement.nativeElement;
  //   fixture.detectChanges();
  //   expect(htmlElement.textContent).toContain(MainConstants.popup_title);
  // });

  // it('should display modal confirmation message', () => {
  //   debugElement = fixture.debugElement.query(By.css('.modal-message'));
  //   htmlElement = debugElement.nativeElement;
  //   fixture.detectChanges();
  //   expect(htmlElement.textContent).toContain(MainConstants.popup_confirmation_message);
  // });

  // it('should invoke #hide of modalRef when close button is clicked', () => {
  //   debugElement = fixture.debugElement.query(By.css('.close'));
  //   debugElement.triggerEventHandler('click', null);
  //   expect(modalRef.hide).toHaveBeenCalled();
  // });

  // it('should set the logout url when submit button is clicked', () => {
  //   debugElement = fixture.debugElement.query(By.css('.submit-btn'));
  //   debugElement.triggerEventHandler('click', null);
  //   expect(globalRefService.window.location.href).toBe('/logout');
  // });
});
