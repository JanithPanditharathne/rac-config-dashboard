import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { KeycloakService } from 'keycloak-angular';

import { MenuItem, UserProfile } from '../../../core/models';

import { LogoutConfirmPopupComponent } from '../logout-confirm-popup/logout-confirm-popup.component';

import { Animation } from '../../../core/services';

/**
 * Component class for showing main view.
 * @class AppMainComponent
 */
@Component({
  animations: [Animation.routeFadeIn],
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html'
})
export class AppMainComponent implements OnInit {
  public appVersion = `version ${window['appVersion']}`;
  public profile: UserProfile;
  public menuItems: MenuItem[] = [];

  constructor(
    private readonly router: Router,
    private readonly modalService: BsModalService,
    private readonly keycloakAngular: KeycloakService
  ) {
    this.menuItems = [
      {
        access: [],
        iconClasses: ['rac-rec-slot-icon', 'menu-icon'],
        routePath: 'rec-slots',
        title: 'Rec Slots'
      },
      {
        access: [],
        iconClasses: ['recommendation-icon', 'menu-icon'],
        routePath: 'recommendations',
        title: 'Recommendations'
      },
      {
        access: [],
        iconClasses: ['bundle-icon', 'menu-icon'],
        routePath: 'bundles',
        title: 'Bundles'
      },
      {
        access: [],
        iconClasses: ['algorithm-icon', 'menu-icon'],
        routePath: 'algorithms',
        title: 'Algorithms'
      },
      {
        access: [],
        iconClasses: ['rule-icon', 'menu-icon'],
        routePath: 'rules',
        title: 'Rules'
      }
    ];
  }

  /**
   * Logout event handler.
   */
  public onLogout(): void {
    this.modalService.show(LogoutConfirmPopupComponent, {class: 'logout-popup confirmation-popup', ignoreBackdropClick: true});
  }

  /**
   * Responsible for return current router state.
   */
  public getState(): string {
    return this.router.url;
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    try {
      this.profile = {
        username: this.keycloakAngular.getUsername()
      };
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }
}
