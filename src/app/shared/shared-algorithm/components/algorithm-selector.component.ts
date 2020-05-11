import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlgorithmSelector } from '../models/algorithm-selector.model';
import { CustomFormValidator, FormValidator } from '../../shared-common/services';
import { ColumnActionType, ActionType } from '../../shared-common/enums';
import { DataTableRow, DropdownSelectMode } from 'ornamentum';
import { Algorithm } from '../../../feature/algorithm/models/algorithm.model';
import { DisplayAlgorithm } from '../../../feature/algorithm/models/display-algorithm.model';
import { AlgorithmService } from '../services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditDisplayTextComponent } from './edit-display-text/edit-display-text.component';

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

  constructor(
    private algorithmService: AlgorithmService,
    private modalService: BsModalService
  ) {
    this.algorithmService.getAlgorithms().subscribe((displayAlgorithm: DisplayAlgorithm) => {
      this.algorithmDropdownData = displayAlgorithm.algorithms;
    });
  }

  @Input()
  public algorithmsFormGroup: FormGroup;

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

  public isMoveUpButtonDisabled(row: DataTableRow<Algorithm>): boolean {
    return row.index === 1;
  }

  public isMoveDownButtonDisabled(row: DataTableRow<Algorithm>): boolean {
    const selectedAlgorithms: Algorithm[] = this.algorithmsFormGroup.get('algorithms').value;
    return selectedAlgorithms && row.index === selectedAlgorithms.length;
  }

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

  public onAlgorithmDelete(row: DataTableRow<Algorithm>): void {
    const selectedAlgorithms: Algorithm[] = this.algorithmsFormGroup.get('algorithms').value;
    const selectedItemsCopy = [...selectedAlgorithms];

    selectedItemsCopy.splice(row.index - 1, 1);

    this.algorithmsFormGroup.patchValue({
      algorithms: selectedItemsCopy
    });

    FormValidator.markFormArrayDirty(this.algorithmsFormGroup);
  }

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.algorithmsFormGroup.get(controlName));
  }

  public onAlgorithmChange(selectedAlgorithm: Algorithm): void {
    if (!selectedAlgorithm) {
      return;
    }

    this.algorithmsFormGroup.patchValue({
      selectedAlgorithm: selectedAlgorithm,
      description: selectedAlgorithm.description
    });
  }

  public onAlgorithmAdd() {
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

  private hasSameAlgorithm(currentAlgorithms: Algorithm[], newAlgorithm: Algorithm) {
    return !!currentAlgorithms.find((algorithm: Algorithm) => algorithm.id === newAlgorithm.id);
  }

  public onEditDisplayText(row: DataTableRow<Algorithm>) {
    let modalRef: BsModalRef;

    modalRef = this.modalService.show(EditDisplayTextComponent, {class: 'display-text-edit-confirm-popup', ignoreBackdropClick: true});
    modalRef.content.setDisplayTextFormData(row.item.defaultDisplayText);
    modalRef.content.autoResolve = false;
    modalRef.content.saveClick.subscribe((text: string) => {
      row.item.customDisplayText = text;
    });
  }

  public renderDisplayText(algorithm: Algorithm) {
    return algorithm.customDisplayText ? algorithm.customDisplayText : algorithm.defaultDisplayText;
  }
}
