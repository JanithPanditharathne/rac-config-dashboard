import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { ActionClickEventArgs } from '../../../shared-common/models';

import { ActionType } from 'src/app/shared/shared-common/enums';

import { FormValidator } from '../../../shared-common/services';

/**
 * Class representing edit display text component.
 * @class EditDisplayTextComponent
 */
@Component({
  selector: 'app-edit-display-text',
  styleUrls: ['./edit-display-text.component.scss'],
  templateUrl: './edit-display-text.component.html'
})
export class EditDisplayTextComponent {
  public ActionType = ActionType;

  public saveClick = new Subject();
  public displayTextForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public modalRef: BsModalRef
  ) {
  }

  /**
   * Hides the edit window upon the  cancel window cancel click event.
   */
  public onCancelClick(): void {
    this.modalRef.hide();
  }

  /**
   * Save click event handler.
   * @param {ActionClickEventArgs} actionClickEventArgs click event arguments.
   */
  public onSaveClick(actionClickEventArgs: ActionClickEventArgs): void {
    const displayText = this.displayTextForm.value.defaultText;
    this.saveClick.next(displayText);
    actionClickEventArgs.resolve();
    this.modalRef.hide();
  }

  /**
   * Responsible for setting display text form.
   * @param {string} currentDisplayText
   */
  public setDisplayTextFormData(currentDisplayText: string): void {
    this.displayTextForm = this.fb.group({
      defaultText: [currentDisplayText],
    });
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.displayTextForm.get(controlName));
  }

  /**
   * On Component destroy.
   */
  public ngOnDestroy(): void {
    this.saveClick.complete();
  }
}
