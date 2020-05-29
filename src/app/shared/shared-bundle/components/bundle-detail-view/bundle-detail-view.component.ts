import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataTableRow } from 'ornamentum';

import { Bundle } from '../../../../feature/bundle/models/bundle.model';

import { BundleService } from '../../services';

/**
 * Class representing the Bundle detail view component.
 * @class BundleDetailViewComponent.
 */
@Component({
  selector: 'app-bundle-detail-view',
  styleUrls: ['./bundle-detail-view.component.scss'],
  templateUrl: './bundle-detail-view.component.html'
})
export class BundleDetailViewComponent implements OnInit, OnDestroy {
  public bundle: Bundle;
  public isLoading = true;
  private bundleServiceSubscription: Subscription;

  @Input()
  public bundleID: number;

  @Input()
  public dataRow: DataTableRow<Bundle>;

  constructor(
    private bundleService: BundleService
  ) {
  }

  /**
   * On component initialization.
   */
  public ngOnInit(): void {
    this.fetchBundleDetails();
  }

  /**
   * Fetch bundle details from the backend.
   */
  private fetchBundleDetails(): void {
    if (this.bundleID) {
      this.bundleServiceSubscription = this.bundleService.getBundleDetails(this.bundleID).subscribe(
        (bundle: Bundle) => {

          if (this.dataRow) {
            this.dataRow.dataLoaded = true;
          }

          this.bundle = bundle;
          this.isLoading = false;
        },
        () => {
          if (this.dataRow) {
            this.dataRow.dataLoaded = false;
            this.dataRow.expanded = false;
          }
          this.isLoading = false;
        }
      );
    } else {
      this.bundle = this.dataRow.item;
      this.isLoading = false;
    }
  }

  /**
   * On component destroy.
   */
  public ngOnDestroy(): void {
    if (this.bundleServiceSubscription) {
      this.bundleServiceSubscription.unsubscribe();
    }
  }
}
