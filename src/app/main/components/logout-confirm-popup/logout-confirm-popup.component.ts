import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { GlobalRefService } from 'ornamentum';

import { UserProfileService } from '../../../core/services';

import { MainConstants } from '../../main.constants';

@Component({
  selector: 'app-logout-confirm-popup',
  styleUrls: ['./logout-confirm-popup.component.scss'],
  templateUrl: './logout-confirm-popup.component.html'
})
export class LogoutConfirmPopupComponent {
  public title = MainConstants.popup_title;
  public message = MainConstants.popup_confirmation_message;

  constructor(public modalRef: BsModalRef, private globalRefService: GlobalRefService, private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.setLogoutPopupStatus(true);
  }

  public onSubmitClick(): void {
    this.globalRefService.window.location.href = '/login';
  }

  public onCloseClick(): void {
    this.modalRef.hide();
    this.userProfileService.setLogoutPopupStatus(false);
  }
}
