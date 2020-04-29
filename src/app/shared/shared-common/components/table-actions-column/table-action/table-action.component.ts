import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ColumnActionType } from '../../../enums';

@Component({
  selector: 'app-table-action',
  styleUrls: ['./table-action.component.scss'],
  templateUrl: './table-action.component.html'
})
export class TableActionComponent {
  @ContentChild('actionTemplate', { static: false })
  public actionTemplate: TemplateRef<any>;

  @Input()
  public type: ColumnActionType;

  @Input()
  public disable: boolean;

  @Input()
  public tooltip: string;

  @Output()
  public actionClick = new EventEmitter<void>();

  public get actionParentCssClass(): string {
    return `${this.type}-parent`;
  }

  public onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit();
  }
}
