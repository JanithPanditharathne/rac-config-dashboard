import { Component } from '@angular/core';

import { CoreConstants } from '../../core.constants';

/**
 * Component class to represent application page not found view.
 * @class PageNotFoundComponent
 */
@Component({
  selector: 'app-page-not-found',
  styleUrls: ['./page-not-found.component.scss'],
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {
  public errorStatus = CoreConstants.page_not_found_error_status;
  public errorHeading = CoreConstants.page_not_found_error_message_heading;
  public errorMessage = CoreConstants.page_not_found_error_message;
}
