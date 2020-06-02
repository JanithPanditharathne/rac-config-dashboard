import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataTableSelectMode, DropdownSelectMode } from 'ornamentum';

import { RecSlot } from '../../models';
import { Rule, DisplayRule } from '../../../rule/models';
import { SuccessResponse } from '../../../../core/models';
import { Recommendation, DisplayRecommendation } from '../../../recommendation/models';
import { ActionBreadcrumb, ActionClickEventArgs, DropDownDataItem } from '../../../../shared/shared-common/models';

import { AlertType, SuccessStatus } from '../../../../core/enums';
import { FormAction, ActionType } from '../../../../shared/shared-common/enums';

import { RecSlotsService } from '../../services';
import { RecSlotUtilityService } from '../../services';
import { NotificationService } from '../../../../core/services';
import { RuleService } from '../../../../shared/shared-rules/services';
import { RecommendationService } from '../../../../shared/shared-rec/services';
import { FormValidator, MetaDataService } from '../../../../shared/shared-common/services';
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

  public recSlotFormGroup: FormGroup;
  public formAction: FormAction;
  public recSlot: RecSlot;
  public currentSelected: any[];
  public recommendationDataSource: Observable<Recommendation[]>;
  public rulesDataSource: Observable<Rule[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ruleService: RuleService,
    public metaDataService: MetaDataService,
    private recSlotsService: RecSlotsService,
    private dialogService: ConfirmDialogService,
    private notificationService: NotificationService,
    private recommendationService: RecommendationService
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

    const recSlotData: RecSlot = RecSlotUtilityService.mapRecSlotValues(formData, this.currentSelected);

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
        return data.recs;
      })
    );
  }

  /**
   * Responsible for set selected rules on data table.
   */
  private setSelectedRules(): void {
    if (this.recSlot && this.recSlot.rules.length) {
      this.currentSelected = this.recSlot.rules.map((rule: DropDownDataItem) => {
        return String(rule.id);
      });
    }
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
        channel: [this.recSlot.channel, Validators.required],
        page: [this.recSlot.page, Validators.required],
        placeholder: [this.recSlot.placeholder, Validators.required],
        recommendation: [this.recSlot.rec, Validators.required],
        rules: [this.recSlot.rules]
      });
    } else {
      this.recSlotFormGroup = this.fb.group({
        channel: [null, Validators.required],
        page: [null, Validators.required],
        placeholder: [null, Validators.required],
        recommendation: [null, Validators.required],
        rules: []
      });
    }
  }
}
