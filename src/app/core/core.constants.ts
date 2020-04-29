export class CoreConstants {
  // internal server error component specific constants
  public static internal_server_error_status = '500';
  public static internal_server_error_message_heading = "Something's not quite right";
  public static internal_server_error_message =
    "The server encountered something unexpected that didn't allow it to complete the request. We apologize. You can go back to";

  // page not found component specific constants
  public static page_not_found_error_status = '400';
  public static page_not_found_error_message_heading = "Oops! You've got lost in space.";
  public static page_not_found_error_message = 'You Should Probably Head ';

  public static unauthorized_error_message_heading = 'Unauthorized';
  public static unauthorized_error_message = 'You are not authorized to access this module.';
  public static unauthorized_redirect_path = 'Home';
  public static unauthorized_route_message = 'You Should Probably Head';

  public static navigation_failure = 'Navigation failure.';

  // response error codes
  public static kira_unauthorized_status_code = 'KIRA-4010';
  public static kira_forbidden_status_code = 'KIRA-4030';

  // notification messages
  public static internal_server_error_notification_message = 'INTERNAL SERVER ERROR';
  public static no_internet_connection_error_notification_message = 'NO INTERNET CONNECTION';
  public static request_failure_error_notification_message = 'REQUEST FAILURE';
}
