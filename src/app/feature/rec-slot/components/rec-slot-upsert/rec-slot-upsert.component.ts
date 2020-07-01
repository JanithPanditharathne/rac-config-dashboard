import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataTableRow, DataTableSelectMode, DropdownSelectMode } from 'ornamentum';

import { RecSlot } from '../../models';
import { Rule, DisplayRule } from '../../../rule/models';
import { SuccessResponse } from '../../../../core/models';
import { Recommendation, DisplayRecommendation } from '../../../recommendation/models';
import { RecDropdownItemModel } from '../../../../shared/shared-rec/models/rec-dropdown-item.model';
import { ActionBreadcrumb, ActionClickEventArgs, DropDownDataItem } from '../../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../../core/enums';
import { FormAction, ActionType } from '../../../../shared/shared-common/enums';

import { RecSlotsService } from '../../services';
import { NotificationService } from '../../../../core/services';
import { RuleService } from '../../../../shared/shared-rules/services';
import { FormValidator, MetaDataService } from '../../../../shared/shared-common/services';
import { RecommendationService, RecSlotUtilityService } from '../../../../shared/shared-rec/services';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';

import { RecSlotConstants } from '../../rec-slot.constants';

/**
 * Class representing the Rec slot upsert component.
 * @class RecSlotUpsertComponent.
 */
@Component({
  selector: 'app-rec-slot-upsert',
  styleUrls: ['./rec-slot-upsert.component.scss'],
  templateUrl: './rec-slot-upsert.component.html'
})
export class RecSlotUpsertComponent implements OnInit {
  public dropdownSelectMode: DropdownSelectMode = 'single';
  public selectMode: DataTableSelectMode = 'multi';
  public actionBreadcrumb: ActionBreadcrumb[];
  public ActionType = ActionType;
  public FormAction = FormAction;

  public isEdit: boolean;
  public recSlot: RecSlot;
  public formAction: FormAction;
  public currentSelected: any[];
  public recSlotFormGroup: FormGroup;
  public recommendationDataSource: Observable<RecDropdownItemModel[]>;
  public rulesDataSource: Observable<Rule[]>;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public metaDataService: MetaDataService,
    private readonly ruleService: RuleService,
    private readonly recSlotsService: RecSlotsService,
    private readonly dialogService: ConfirmDialogService,
    private readonly notificationService: NotificationService,
    private readonly recSlotUtilityService: RecSlotUtilityService,
    private readonly recommendationService: RecommendationService
  ) {
    this.actionBreadcrumb = [
      {
        path: 'rec-slots/list',
        title: 'Rec Slots'
      }
    ];
    this.fetchRecData();
    this.fetchRuleData();
  }

  /**
   * OnInit event handler.
   */
  public ngOnInit(): void {
    this.route.data.subscribe((data: { recSlot: RecSlot; formAction: FormAction }) => {
      if (data.recSlot) {
        this.recSlot = data.recSlot;
        this.isEdit = true;
      }

      this.formAction = data.formAction;
      switch (this.formAction) {
        case FormAction.EDIT:
          if (!this.recSlot) {
            break;
          }
          this.actionBreadcrumb.push({
            path: `rec-slots/edit/${this.recSlot.id}`,
            title: 'Edit Rec Slot'
          });
          break;
        case FormAction.ADD:
          this.actionBreadcrumb.push({
            path: 'rec-slots/add',
            title: 'Add New Rec Slot'
          });
          break;
      }
    });

    this.buildFormGroup();
    this.setSelectedRules();
  }

  /**
   * Responsible for check validity of given form control.
   * @param {string} controlName control name
   * @returns {boolean} true or false.
   */
  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.recSlotFormGroup.get(controlName));
  }

  /**
   * Responsible for redirect to rec slots view page.
   */
  public redirectToRecSlots(): void {
    this.router.navigate(['rec-slots']);
  }

  /**
   * On save click event handler.
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  public onSaveClick(clickEventArgs: ActionClickEventArgs): void {
    FormValidator.validateAllFormFields(this.recSlotFormGroup);

    if (this.recSlotFormGroup.invalid) {
      clickEventArgs.resolve();
      this.notificationService.showNotification(RecSlotConstants.rec_slot_create_invalid_form, AlertType.ERROR);
      return;
    }

    const formData = this.recSlotFormGroup.value;

    const recSlotData: RecSlot = this.recSlotUtilityService.mapRecSlotValues(formData, this.currentSelected);

    switch (this.formAction) {
      case FormAction.ADD:
        this.addNewRecSlot(recSlotData, clickEventArgs);
        break;
      case FormAction.EDIT:
        this.editRecSlot(recSlotData, clickEventArgs);
        break;
    }
  }

  /**
   * Responsible for fetch rule data.
   */
  private fetchRuleData(): void {
    this.rulesDataSource = this.ruleService.getRules().pipe(
      map((data: DisplayRule) => {
        return data.rules;
      })
    );
  }

  /**
   * Responsible for fetch rule data.
   */
  private fetchRecData(): void {
    this.recommendationDataSource = this.recommendationService.getRecs().pipe(
      map((data: DisplayRecommendation) => {
        return data.recs.map((recommendation: Recommendation) => {
          return this.recSlotUtilityService.parseRecSlotDropdownItem(recommendation);
        });
      })
    );
  }

  /**
   * Responsible for set selected rules on data table.
   */
  private setSelectedRules(): void {
    if (this.recSlot && this.recSlot.rules.length) {
      this.currentSelected = this.recSlot.rules.map((rule: DropDownDataItem) => {
        return rule.id;
      });
    }
  }

  /**
   * Set on dynamic row span extract event handler.
   * @param {DataTableRow<Rule>} row data row
   */
  public onDynamicRowSpanExtract(row: DataTableRow<Rule>) {
    if (row.item.isGlobal) {
      row.selected = true;
      row.disabled = true;
    }
    return 1;
  }

  /**
   * Responsible for map row data to filter options.
   * @param {Rule} item data row
   * @return {any} any
   */
  public onIsGlobalFilterMapper(item: Rule): any {
    return {
      key: item.isGlobal,
      value: item.isGlobal ? 'Yes' : 'No'
    };
  }

  /**
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.recSlotFormGroup.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }

  /**
   * Rule select event handler.
   */
  public onRuleSelect(): void {
    this.recSlotFormGroup.markAsDirty();
  }

  /**
   * Responsible for add new rec slot.
   * @param {RecSlot} recSlotData details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private addNewRecSlot(recSlotData: RecSlot, clickEventArgs: ActionClickEventArgs): void {
    this.recSlotsService.createRecSlot(recSlotData).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.recSlotFormGroup.markAsPristine();
        this.redirectToRecSlots();
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for edit a rec slot.
   * @param {RecSlot} recSlotData details
   * @param {ActionClickEventArgs} clickEventArgs click event arguments.
   */
  private editRecSlot(recSlotData: RecSlot, clickEventArgs: ActionClickEventArgs): void {
    recSlotData.id = this.recSlot.id;
    this.recSlotsService.updateRecSlot(recSlotData).subscribe(
      (response: SuccessResponse) => {
        clickEventArgs.resolve();

        if (response.status === SuccessStatus.FAIL) {
          this.notificationService.showNotification(response.message, AlertType.ERROR);
          return;
        }
        this.notificationService.showNotification(response.message, AlertType.SUCCESS);
        this.recSlotFormGroup.markAsPristine();
        this.redirectToRecSlots();
      },
      (error) => {
        clickEventArgs.resolve();
      }
    );
  }

  /**
   * Responsible for build form group.
   */
  private buildFormGroup(): void {
    if (this.recSlot) {
      this.recSlotFormGroup = this.fb.group({
        slotId: [this.recSlot.id],
        channel: [this.recSlot.channel, Validators.required],
        page: [this.recSlot.page, Validators.required],
        placeholder: [this.recSlot.placeholder, Validators.required],
        recommendation: [
          this.recSlotUtilityService.parseRecSlotDropdownItem(this.recSlot.rec),
          Validators.required
        ],
        rules: [this.recSlot.rules]
      });
    } else {
      this.recSlotFormGroup = this.fb.group({
        slotId: [null],
        channel: [null, Validators.required],
        page: [null, Validators.required],
        placeholder: [null, Validators.required],
        recommendation: [null, Validators.required],
        rules: []
      });
    }
  }
}
