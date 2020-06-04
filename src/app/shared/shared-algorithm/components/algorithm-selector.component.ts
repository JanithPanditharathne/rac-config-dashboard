import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DataTableRow, DropdownSelectMode } from 'ornamentum';

import { AlgorithmSelector } from '../models';
import { Algorithm, DisplayAlgorithm } from '../../../feature/algorithm/models';

import { ColumnActionType, ActionType } from '../../shared-common/enums';

import { EditDisplayTextComponent } from './edit-display-text/edit-display-text.component';

import { AlgorithmService } from '../services';
import { CustomFormValidator, FormValidator } from '../../shared-common/services';

/**
 * Class representing algorithm selector component.
 * @class AlgorithmSelectorComponent
 */
@Component({
  selector: 'app-algorithm-selector',
  styleUrls: ['./algorithm-selector.component.scss'],
  templateUrl: './algorithm-selector.component.html'
})
export class AlgorithmSelectorComponent {
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public ActionType = ActionType;
  public ColumnActionType = ColumnActionType;
  public algorithmDropdownData: Algorithm[];

  @Input()
  public algorithmsFormGroup: FormGroup;

  @Input()
  public isPopupView: boolean;

  constructor(
    private modalService: BsModalService,
    private algorithmService: AlgorithmService
  ) {
    this.algorithmService.getAlgorithms().subscribe((displayAlgorithm: DisplayAlgorithm) => {
      this.algorithmDropdownData = displayAlgorithm.algorithms;
    });
  }

  /**
   * Responsible for build form group.
   * @return {FormGroup} form group
   */
  public static buildFormGroup(fb: FormBuilder, algorithmSelector?: AlgorithmSelector): FormGroup {
    if (algorithmSelector) {
      return fb.group({
        algorithms: [algorithmSelector.algorithms, CustomFormValidator.arrayMinLength(1)],
        selectedAlgorithm: [null],
        description: ['']
      });
    }
    return fb.group({
      algorithms: [[], CustomFormValidator.arrayMinLength(1)],
      selectedAlgorithm: [null],
      description: ['']
    });
  }

  /**
   * Responsible for disable move up button.
   * @param {DataTableRow<Algorithm>} row table row
   * @return {boolean} true or false
   */
  public isMoveUpButtonDisabled(row: DataTableRow<Algorithm>): boolean {
    return row.index === 1;
  }

  /**
   * Responsible for disable move down button.
   * @param {DataTableRow<Algorithm>} row table row
   * @return {boolean} true or false
   */
  public isMoveDownButtonDisabled(row: DataTableRow<Algorithm>): boolean {
    const selectedAlgorithms: Algorithm[] = this.algorithmsFormGroup.get('algorithms').value;
    return selectedAlgorithms && row.index === selectedAlgorithms.length;
  }

  /**
   * Algorithm order change event handler.
   * @param {number} index
   * @param {boolean} up
   */
  public onAlgorithmOrderChange(index: number, up: boolean): void {
    const selectedAlgorithms = this.algorithmsFormGroup.get('algorithms').value;
    const selectedItemsCopy = [...selectedAlgorithms];

    const moveIndex = up ? index + 1 : index - 1;
    const currentItem = selectedItemsCopy[index];
    selectedItemsCopy[index] = selectedItemsCopy[moveIndex];
    selectedItemsCopy[moveIndex] = currentItem;

    this.algorithmsFormGroup.patchValue({
      algorithms: selectedItemsCopy
    });

    FormValidator.markFormArrayDirty(this.algorithmsFormGroup);
  }

  /**
   * Delete algorithm from table event listener.
   * @param {DataTableRow<Algorithm>} row data table row
   */
  public onAlgorithmDelete(row: DataTableRow<Algorithm>): void {
    const selectedAlgorithms: Algorithm[] = this.algorithmsFormGroup.get('algorithms').value;
    const selectedItemsCopy = [...selectedAlgorithms];

    selectedItemsCopy.splice(row.index - 1, 1);

    this.algorithmsFormGroup.patchValue({
      algorithms: selectedItemsCopy
    });

    FormValidator.markFormArrayDirty(this.algorithmsFormGroup);
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.algorithmsFormGroup.get(controlName));
  }

  /**
   * Algorithm change evenet listner.
   * @param {Algorithm} selectedAlgorithm
   */
  public onAlgorithmChange(selectedAlgorithm: Algorithm): void {
    if (!selectedAlgorithm) {
      return;
    }

    this.algorithmsFormGroup.patchValue({
      selectedAlgorithm: selectedAlgorithm,
      description: selectedAlgorithm.description
    });
  }

  /**
   * Algorithm add event listener.
   */
  public onAlgorithmAdd(): void {
    const currentAlgorithms: Algorithm[] = this.algorithmsFormGroup.get('algorithms').value;
    const newAlgorithm: Algorithm = this.algorithmsFormGroup.get('selectedAlgorithm').value;

    if (!this.hasSameAlgorithm(currentAlgorithms, newAlgorithm)) {
      let algorithms = [...currentAlgorithms, newAlgorithm];

      this.algorithmsFormGroup.patchValue({
        algorithms: algorithms,
        selectedAlgorithm: null,
        description: null
      });
    }
  }

  /**
   * Edit display text event handler.
   * @param {DataTableRow<Algorithm>} row data table row
   */
  public onEditDisplayText(row: DataTableRow<Algorithm>): void {
    let modalRef: BsModalRef;

    modalRef = this.modalService.show(EditDisplayTextComponent, {class: 'display-text-edit-confirm-popup', ignoreBackdropClick: true});
    modalRef.content.setDisplayTextFormData(row.item.customDisplayText || row.item.defaultDisplayText);
    modalRef.content.autoResolve = false;
    modalRef.content.saveClick.subscribe((text: string) => {
      row.item.customDisplayText = text;
    });
  }

  /**
   * Responsible for render algorithm display text.
   * @param {Algorithm} algorithm
   * @return {string} display text
   */
  public renderDisplayText(algorithm: Algorithm): string {
    return algorithm.customDisplayText ? algorithm.customDisplayText : algorithm.defaultDisplayText;
  }

  /**
   * Check whether algorithm already exists in list.
   * @param {Algorithm[]} currentAlgorithms list of algorithms
   * @param {Algorithm} newAlgorithm algorithm to add
   * @return {boolean} true or false
   */
  private hasSameAlgorithm(currentAlgorithms: Algorithm[], newAlgorithm: Algorithm): boolean {
    return !!currentAlgorithms.find((algorithm: Algorithm) => algorithm.id === newAlgorithm.id);
  }
}
