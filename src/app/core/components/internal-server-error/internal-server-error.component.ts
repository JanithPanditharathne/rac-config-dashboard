import { Component } from '@angular/core';

import { CoreConstants } from '../../core.constants';

/**
 * Component class to represent application internal server error view.
 * @class InternalServerErrorComponent
 */
@Component({
  selector: 'app-internal-server-error',
  styleUrls: ['./internal-server-error.component.scss'],
  templateUrl: './internal-server-error.component.html'
})
export class InternalServerErrorComponent {
  public errorStatus = CoreConstants.internal_server_error_status;
  public errorHeading = CoreConstants.internal_server_error_message_heading;
  public errorMessage = CoreConstants.internal_server_error_message;
}
