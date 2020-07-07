import { Injectable } from '@angular/core';

import { Bundle } from '../../../feature/bundle/models/bundle.model';

/**
 * Class representing bundle utility service.
 * @class BundleUtilityService
 */
@Injectable()
export class BundleUtilityService {

  /**
   * Responsible for parse bundle to bundle dropdown item.
   * @param {Bundle} bundle
   * @return {Bundle} bundle
   */
  public parseBundleDropdownItem(bundle: Bundle): Bundle {
    bundle.displayName = `${bundle.name} (ID: ${bundle.id})`;
    return bundle;
  }
}
