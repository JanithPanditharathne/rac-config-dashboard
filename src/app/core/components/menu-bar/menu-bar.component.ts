import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';

import { UserProfileService } from '../../services';

import { MenuItem, UserProfile } from '../../models';

@Component({
  selector: 'app-menu-bar',
  styleUrls: ['./menu-bar.component.scss'],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent implements AfterContentInit, OnInit {
  private static MOBILE_BREAKPOINT = 991;

  public menuCollapsed = true;

  @Input()
  public menuItems: MenuItem[];

  @Input()
  public appName: string;

  @Input()
  public profile: UserProfile;

  @Output()
  public logout = new EventEmitter();

  constructor(private router: Router, private userProfileService: UserProfileService) {}

  public toggleMenuCollapse(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  public hideCollapsibleMenu(): void {
    this.menuCollapsed = true;
  }

  public onLogout(): void {
    if (!this.userProfileService.getLogoutPopupStatus()) {
      this.logout.emit();
    }
  }

  public resetState(menuItems: MenuItem[], active: boolean, expand: boolean): void {
    menuItems.forEach((item: MenuItem) => {
      if (active) {
        item.active = false;
      }

      if (expand) {
        item.expanded = false;
      }

      if (item.items) {
        this.resetState(item.items, active, expand);
      }
    });
  }

  public menuItemMouseEnter(...menuItemPath: MenuItem[]): void {
    if (window.innerWidth < MenuBarComponent.MOBILE_BREAKPOINT) {
      return;
    }

    this.resetState(this.menuItems, false, true);
    menuItemPath.forEach((menuItem: MenuItem) => {
      if (menuItem.items) {
        menuItem.expanded = true;
      }
    });
  }

  public menuItemMouseLeave(): void {
    if (window.innerWidth < MenuBarComponent.MOBILE_BREAKPOINT) {
      return;
    }

    this.resetState(this.menuItems, false, true);
  }

  public onMenuItemClick(...menuItemPath: MenuItem[]): void {
    const clickedItem = menuItemPath[menuItemPath.length - 1];
    const expandedState = clickedItem.expanded;

    if (clickedItem.items && clickedItem.items.length) {
      this.resetState(this.menuItems, false, true);
      menuItemPath.forEach((item: MenuItem) => {
        item.expanded = item === clickedItem ? !expandedState : true;
      });

      return;
    }

    this.resetState(this.menuItems, true, true);

    menuItemPath.forEach((item: MenuItem) => {
      item.active = true;
    });

    this.menuCollapsed = true;

    this.router.navigateByUrl(menuItemPath.map(menuItem => menuItem.routePath).join('/'));
  }

  public ngOnInit(): void {
    this.setVisibleState(this.menuItems);
    this.resetState(this.menuItems, true, true);
  }

  public initMenuItemActiveState(segments: UrlSegment[], menuItems: MenuItem[]): void {
    if (segments.length && menuItems.length) {
      const segment = segments.splice(0, 1)[0];
      const menuItem = menuItems.find((item: MenuItem) => {
        return item.routePath === segment.path;
      });

      if (menuItem) {
        menuItem.active = true;
        if (menuItem.items) {
          this.initMenuItemActiveState(segments, menuItem.items);
        }
      }
    }
  }

  public ngAfterContentInit(): void {
    const urlPath = this.router.parseUrl(this.router.url);
    if (urlPath.root.children.primary) {
      const segmentGroup = urlPath.root.children.primary.segments;
      this.initMenuItemActiveState([...segmentGroup], this.menuItems);
    }
  }

  public hasChildren(menuItem: MenuItem): boolean {
    return !!(menuItem.items && menuItem.items.length);
  }

  private setVisibleState(menuItems: MenuItem[]): void {
    menuItems.forEach((item: MenuItem) => {
      item.visible = true;

      if (item.items) {
        this.setVisibleState(item.items);
      }
    });
  }

  public goToHomePage() {
    this.router.navigate(['/']);
  }
}
