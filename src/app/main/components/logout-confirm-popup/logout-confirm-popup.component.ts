import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { GlobalRefService } from 'ornamentum';

import { KeycloakService } from 'keycloak-angular';

import { UserProfileService } from '../../../core/services';

import { MainConstants } from '../../main.constants';

@Component({
  selector: 'app-logout-confirm-popup',
  styleUrls: ['./logout-confirm-popup.component.scss'],
  templateUrl: './logout-confirm-popup.component.html'
})
export class LogoutConfirmPopupComponent {
  public title = MainConstants.popupTitle;
  public message = MainConstants.popupConfirmationMessage;

  constructor(
    public modalRef: BsModalRef,
    private readonly keycloakAngular: KeycloakService,
    private readonly globalRefService: GlobalRefService,
    private readonly userProfileService: UserProfileService
  ) {
  }

  ngOnInit(): void {
    this.userProfileService.setLogoutPopupStatus(true);
  }

  public onSubmitClick(): void {
    this.keycloakAngular.logout(document.baseURI).then(() => {
      this.modalRef.hide();
    }, (err) => {
      console.log(err);
    });
  }

  public onCloseClick(): void {
    this.modalRef.hide();
    this.userProfileService.setLogoutPopupStatus(false);
  }
}
