import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActionClickEventArgs} from '../../../shared/shared-common/models';

import {ActionType} from 'src/app/shared/shared-common/enums';

import {CustomFormValidator} from '../../../shared/shared-common/services';
import {Router} from '@angular/router';
import {AuthService, NotificationService} from '../../services';
import {AlertType} from "../../enums";

/**
 * Component class for showing login view.
 * LoginComponent
 */
@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public ActionType = ActionType;

  public loginForm: FormGroup;

  public isAuthorized = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService:NotificationService
  ) {
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        CustomFormValidator.regexPattern(CustomFormValidator.username_regex),
        Validators.minLength(4),
        Validators.maxLength(128)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        CustomFormValidator.regexPattern(CustomFormValidator.password_regex),
        Validators.minLength(8),
        Validators.maxLength(40)
      ])],
    })
  }

  /**
   * On key up event.
   */
  public onKeyPress(): void {
    this.isAuthorized = true;
  }

  /**
   * Login event handler.
   */
  public onLoginClick(actionClickArgs: ActionClickEventArgs): void {
    actionClickArgs.resolve();
    const userData = this.loginForm.value;
    if (userData.username === 'admin' && userData.password === 'admin1234') {
      this.authService.authenticate({
        username: userData.username,
        password: userData.password
      });
      this.router.navigate(['/']).then((e) => {
      }).catch((e) => {
        console.error(e);
      });
      return;
    }
    this.loginForm.reset();
    this.isAuthorized = false;
  }
}
