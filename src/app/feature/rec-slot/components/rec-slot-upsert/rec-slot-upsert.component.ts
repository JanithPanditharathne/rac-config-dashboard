import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator, MetaDataService } from '../../../../shared/shared-common/services';
import { DataTableSelectMode, DropdownSelectMode } from 'ornamentum';
import { FormAction, ActionType } from '../../../../shared/shared-common/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { RecSlot } from '../../models/rec-slot.model';
import { ActionBreadcrumb, ActionClickEventArgs, DropDownDataItem } from '../../../../shared/shared-common/models';
import { map } from 'rxjs/operators';
import { DisplayRecommendation } from '../../../recommendation/models/display-recommendation.model';
import { Recommendation } from '../../../recommendation/models/recommendation.model';
import { Observable } from 'rxjs';
import { RecommendationService } from '../../../../shared/shared-rec/services';
import { Rule } from '../../../rule/models/rule.model';
import { RuleService } from '../../../../shared/shared-rules/services';
import { DisplayRule } from '../../../rule/models/display-rule.model';
import { AlertType, SuccessStatus } from '../../../../core/enums';
import { NotificationService } from '../../../../core/services';
import { RecSlotConstants } from '../../rec-slot.constants';
import { SuccessResponse } from '../../../../core/models';
import { RecSlotsService } from '../../services';
import { ConfirmDialogService } from '../../../../shared/shared-common/services/confirm-dialog.service';
import { RecSlotUtilityService } from '../../services';

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
  public MetaDataService = MetaDataService;
  public ActionType = ActionType;
  public FormAction = FormAction;

  public recSlotFormGroup: FormGroup;
  public recSlot: RecSlot;
  public formAction: FormAction;
  public recommendationDataSource: Observable<Recommendation[]>;
  public rulesDataSource: Observable<Rule[]>;
  public currentSelected: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ruleService: RuleService,
    private recSlotsService: RecSlotsService,
    private metaDataService: MetaDataService,
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

  public isInvalid(controlName: string): boolean {
    return FormValidator.isInvalidControl(this.recSlotFormGroup.get(controlName));
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

  private buildFormGroup() {
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

  public redirectToRecSlots() {
    this.router.navigate(['rec-slots']);
  }

  public onSaveClick(clickEventArgs: ActionClickEventArgs) {
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

  public renderIsGlobal(item: Rule): string {
    return item.isGlobal ? 'Yes' : 'No';
  }

  private fetchRuleData(): void {
    this.rulesDataSource = this.ruleService.getRules().pipe(
      map((data: DisplayRule) => {
        return data.rules;
      })
    );
  }

  private fetchRecData(): void {
    this.recommendationDataSource = this.recommendationService.getRecs().pipe(
      map((data: DisplayRecommendation) => {
        return data.recs;
      })
    );
  }

  private setSelectedRules(): void {
    if (this.recSlot && this.recSlot.rules.length) {
      this.currentSelected = this.recSlot.rules.map((rule: DropDownDataItem) => {
        return String(rule.id);
      });
    }
  }

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
   * The method to get dialog confirmation will be called by CanDeactivateGuard
   * @return {Observable<boolean> | boolean}
   */
  public canDeactivate(): Observable<boolean> | boolean {
    if (this.recSlotFormGroup.dirty) {
      return this.dialogService.routeDiscardConfirm();
    }

    return true;
  }

  public onRuleSelect(): void {
    this.recSlotFormGroup.markAsDirty();
  }
}
