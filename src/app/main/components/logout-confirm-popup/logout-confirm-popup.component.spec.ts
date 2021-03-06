import { DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { GlobalRefService } from 'ornamentum';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { LogoutConfirmPopupComponent } from './logout-confirm-popup.component';

import { UserProfileService } from "../../../core/services";

const mockUserProfileService  = {
  showLogoutConfirm: false,
};

describe('Logout confirm popup component tests', () => {
  let component: LogoutConfirmPopupComponent;
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

    modalRef = TestBed.get(BsModalRef);
    spyOn(modalRef, 'hide');

    userProfileService = TestBed.get(UserProfileService);
    spyOn(userProfileService, 'getUserProfile').and.callThrough();
  }));
});
