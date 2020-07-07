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
  public errorStatus = CoreConstants.internalServerErrorStatus;
  public errorHeading = CoreConstants.internalServerErrorMessageHeading;
  public errorMessage = CoreConstants.internalServerErrorMessage;
}
