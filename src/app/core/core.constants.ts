export class CoreConstants {
  // internal server error component specific constants
  public static internalServerErrorStatus = '500';
  public static internalServerErrorMessageHeading = 'Something\'s not quite right';
  public static internalServerErrorMessage =
    'The server encountered something unexpected that didn\'t allow it to complete the request. We apologize. You can go back to';

  // page not found component specific constants
  public static pageNotFoundErrorStatus = '400';
  public static pageNotFoundErrorMessageHeading = 'Oops! You\'ve got lost in space.';
  public static pageNotFoundErrorMessage = 'You Should Probably Head ';

  public static unauthorizedErrorMessageHeading = 'Unauthorized';
  public static unauthorizedErrorMessage = 'You are not authorized to access this module.';
  public static unauthorizedRedirectPath = 'Home';
  public static unauthorizedRouteMessage = 'You Should Probably Head';

  public static navigationFailure = 'Navigation failure.';

  // response error codes
  public static kiraUnauthorizedStatusCode = 'KIRA-4010';
  public static kiraForbiddenStatusCode = 'KIRA-4030';

  // notification messages
  public static internalServerErrorNotificationMessage = 'INTERNAL SERVER ERROR';
  public static noInternetConnectionErrorNotificationMessage = 'NO INTERNET CONNECTION';
  public static requestFailureErrorNotificationMessage = 'REQUEST FAILURE';

  // authentication
  public static accessDeniedMessage =
    'Access is denied\n-----------------------\nSorry, you do not have enough privileges to access the CONFIGURATION PORTAL.';
}
