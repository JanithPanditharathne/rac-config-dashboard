import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { DropdownSelectMode } from 'ornamentum';

import { MetaData } from '../../../../shared-rec/models';
import { DropDownDataItem, RuleContextOperatorData } from '../../../../shared-common/models';
import { RuleCustomDataItem } from '../../../../shared-common/models/rule/rule-custom-data-item.model';

import { ActionType } from '../../../../shared-common/enums';
import { RuleGeneratorType, RulesCustomType, RuleTabDisplayDataType, RuleTabInlineDataGeneratorType } from '../../../enums';

import { RuleContextFormUtility, RuleContextDataService } from '../../../services';
import { FormValidator, MetaDataService } from '../../../../shared-common/services';

import { SharedCommonConstants } from 'src/app/shared/shared-common/shared-common.constants'; // NOSONAR

/**
 * Component class to represent custom tab content.
 * @implements OnInit
 * @class CustomContentComponent
 */
@Component({
  selector: 'app-custom-content',
  styleUrls: ['./custom-content.component.scss'],
  templateUrl: './custom-content.component.html'
})
export class CustomContentComponent implements OnInit, AfterViewInit {
  public valueInputType = 'text';
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public SharedCommonConstants = SharedCommonConstants;
  public RuleTabInlineDataGeneratorType = RuleTabInlineDataGeneratorType;
  public ActionType = ActionType;

  public operators: RuleContextOperatorData[] = RuleContextFormUtility.numericalOperators;

  public selectedKey: string;
  public customFormGroup: FormGroup;
  public values: DropDownDataItem[] = [];
  private valuesSubscription: Subscription;

  @ViewChild('keyInput', {static: false}) keyInput: ElementRef;

  @Input()
  public ruleGeneratorType = RuleGeneratorType.MATCHING;

  @Input()
  public parentElement: HTMLElement;

  @Input()
  public formDataArray: FormArray;

  @Input()
  public keys: string[] = [];

  public static buildFormGroup(fb: FormBuilder, customData?: RuleCustomDataItem): FormGroup {
    return RuleContextFormUtility.buildFormGroup(fb, RuleTabDisplayDataType.Custom, customData);
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly metaDataService: MetaDataService,
    private readonly ruleContextDataService: RuleContextDataService) {
  }

  /**
   * ngOnInit Event Handler.
   */
  public ngOnInit(): void {
    this.customFormGroup = this.initCustomFormGroup();
  }

  /**
   * ngAfterViewInit Event handler.
   */
  public ngAfterViewInit(): void {
    fromEvent(this.keyInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.onKeySelect();
        })
      ).subscribe();
  }

  /**
   * Responsible for check availability of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isDisabled(controlName: string): boolean {
    return this.customFormGroup.invalid;
  }

  /**
   * Trigger on apply event for the selected data in the text field components.
   */
  public onApply(): void {
    const formValue = this.customFormGroup.value;
    const customGroup = CustomContentComponent.buildFormGroup(this.fb);

    const existingGroup = this.ruleContextDataService.findCustomFormGroup(this.formDataArray, formValue.key, formValue.operator.type);
    if (existingGroup) {
      const formGroupValueFormControl = existingGroup.get('value');
      const formGroupValue = formGroupValueFormControl.value.values || [];

      if (formGroupValue.includes(formValue.values)) {
        return;
      }

      existingGroup.get('value').patchValue({
        key: formValue.key,
        values: [...formGroupValue, formValue.values]
      }, true);

      this.formDataArray.markAsDirty();

      this.customFormGroup.reset({
        key: null
      });
      return;
    }
    customGroup.patchValue({
      operator: formValue.operator.type,
      value: {
        key: formValue.key,
        values: [formValue.values]
      }
    });

    this.formDataArray.push(customGroup);
    this.formDataArray.markAsDirty();

    this.customFormGroup.reset({
      key: null
    });
  }

  /**
   * Responsible for receiving the item to be removed.
   * @param {string} data The age appropriation data of the item to be removed.
   */
  public onRemove(data: any): void {
    const index = this.formDataArray.value.indexOf(data);
    this.formDataArray.removeAt(index);
    this.formDataArray.markAsDirty();
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.customFormGroup.get(controlName));
  }

  /**
   * Key select event handler.
   */
  public onKeySelect(): void {
    switch (this.selectedKey) {
      case RulesCustomType.REVIEW_COUNT:
      case RulesCustomType.RATING:
        this.addNumericalValidators();
        break;
      default:
        this.addNonNumericalValidators();
        break;
    }

    this.customFormGroup.patchValue({
      operator: null,
      values: null
    });

    this.updateValues();
  }

  /**
   * Responsible for check type of the value input.
   */
  public isNumericKey(): boolean {
    return this.valueInputType === 'number';
  }

  /**
   * Responsible to add numerical validators to values field.
   */
  private addNumericalValidators(): void {
    this.valueInputType = 'number';
  }

  /**
   * Responsible to add non-numerical validators to values field.
   */
  private addNonNumericalValidators(): void {
    this.valueInputType = 'text';
  }

  /**
   * Responsible for update values field.
   */
  private updateValues(): void {
    if (this.valuesSubscription) {
      this.valuesSubscription.unsubscribe();
    }
    this.values = [];

    if (!this.selectedKey || !this.selectedKey.trim().length) {
      return;
    }

    this.valuesSubscription = this.metaDataService.getMetaValues(this.selectedKey).subscribe((data: MetaData) => {
      this.values = data.metadata;
    });
  }

  /**
   * Responsible for create form group.
   */
  private initCustomFormGroup(): FormGroup {
    return this.fb.group({
      key: [null, Validators.required],
      operator: [null, Validators.required],
      values: [null, Validators.required]
    });
  }
}
