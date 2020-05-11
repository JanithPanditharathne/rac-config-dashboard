import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

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
  public profile: UserProfile;
  public menuItems: MenuItem[] = [];

  constructor(private modalService: BsModalService, private router: Router, private route: ActivatedRoute) {
    this.menuItems = [
      {
        access: [],
        iconClasses: ['zmdi', 'zmdi zmdi-layers', 'menu-icon'],
        routePath: 'rec-slots',
        title: 'Rec Slots'
      },
      {
        access: [],
        iconClasses: ['zmdi', 'zmdi zmdi-layers', 'menu-icon'],
        routePath: 'recommendations',
        title: 'Recommendations'
      },
      {
        access: [],
        iconClasses: ['zmdi', 'zmdi zmdi-layers', 'menu-icon'],
        routePath: 'bundles',
        title: 'Bundles'
      },
      {
        access: [],
        iconClasses: ['zmdi', 'zmdi zmdi-layers', 'menu-icon'],
        routePath: 'algorithms',
        title: 'Algorithms'
      },
      {
        access: [],
        iconClasses: ['zmdi', 'zmdi zmdi-layers', 'menu-icon'],
        routePath: 'rules',
        title: 'Rules'
      }
    ];
  }

  public onLogout(): void {
    this.modalService.show(LogoutConfirmPopupComponent, {class: 'logout-popup confirmation-popup', ignoreBackdropClick: true});
  }

  public getState(): string {
    return this.router.url;
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { profile: UserProfile }) => {
      if (data && data.profile) {
        this.profile = data.profile;
      }
    });
  }
}
