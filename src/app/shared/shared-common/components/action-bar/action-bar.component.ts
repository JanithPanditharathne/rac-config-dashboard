import { Component, ContentChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ActionButtonStrapComponent } from './action-button-strap/action-button-strap.component';

import { ActionBreadcrumb } from '../../models';

import { AlertType } from '../../../../core/enums';

import { NotificationService } from '../../../../core/services';

/**
 * Component class to represent application action bar.
 * @class ActionBarComponent
 */
@Component({
  selector: 'app-action-bar',
  styleUrls: ['./action-bar.component.scss'],
  templateUrl: './action-bar.component.html'
})
export class ActionBarComponent {
  @ContentChild('actionButtonStrap', {static: false})
  public actionButtonStrap: ActionButtonStrapComponent;

  @Input()
  public breadcrumb: ActionBreadcrumb[];

  constructor(private readonly router: Router,
              private readonly notificationService: NotificationService
  ) {
  }

  public onHeaderClick(header: ActionBreadcrumb): void {
    this.router.navigate([header.path]).catch(() => {
      this.notificationService.showNotification('', AlertType.ERROR);
    });
  }
}
