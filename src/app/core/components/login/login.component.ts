import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionClickEventArgs } from '../../../shared/shared-common/models';

import { ActionType, ActionButtonType } from 'src/app/shared/shared-common/enums';

import { AuthService } from '../../services';
import { CustomFormValidator, FormValidator } from '../../../shared/shared-common/services';

import { CoreConstants } from '../../core.constants';

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
  public ActionButtonType = ActionButtonType;

  public isAuthorized = true;
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
    });
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.loginForm.get(controlName));
  }

  /**
   * On key press event handler.
   */
  public onKeyPress(): void {
    this.isAuthorized = true;
  }

  /**
   * Login event handler.
   * @param {ActionClickEventArgs} actionClickArgs click event arguments.
   */
  public onLoginClick(actionClickArgs: ActionClickEventArgs): void {
    const userData = this.loginForm.value;
    if (userData.username === CoreConstants.admin_username && userData.password === CoreConstants.admin_pw) {
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
    actionClickArgs.resolve();
  }
}
