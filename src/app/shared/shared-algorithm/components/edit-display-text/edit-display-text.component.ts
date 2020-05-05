import { Component } from '@angular/core';
import { ActionType } from 'src/app/shared/shared-common/enums';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionClickEventArgs } from '../../../shared-common/models';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

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

  public displayTextForm: FormGroup;

  public saveClick = new Subject();

  constructor(
    private fb: FormBuilder,
    public modalRef: BsModalRef
  ) {
  }

  /**
   * Hides the edit window upon the  cancel window cancel click event.
   */
  public onCancelClick(): void {
    this.modalRef.hide();
  }

  public onSaveClick(actionClickEventArgs: ActionClickEventArgs) {
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
   * On Component destroy.
   */
  public ngOnDestroy(): void {
    this.saveClick.complete();
  }
}
