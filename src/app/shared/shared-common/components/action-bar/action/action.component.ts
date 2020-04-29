import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ActionClickEventArgs } from '../../../models';

import { ActionType } from '../../../enums';

@Component({
  selector: 'app-action',
  styleUrls: ['./action.component.scss'],
  templateUrl: './action.component.html'
})
export class ActionComponent {
  public ActionType = ActionType;

  public resolved = true;

  @ContentChild('actionTemplate', { static: false })
  public actionTemplate: TemplateRef<any>;

  @Input()
  public type: ActionType;

  @Input()
  public name: string;

  @Input()
  public disable: boolean;

  @Input()
  public autoResolve = true;

  @Output()
  public actionClick = new EventEmitter<ActionClickEventArgs>();

  public get isUpdating(): boolean {
    return !this.autoResolve && !this.resolved;
  }

  public get actionParentCssClass(): string {
    return `${this.actionIconCssClass}-parent`;
  }

  public get actionIconCssClass(): string {
    return this.isUpdating ? 'zmdi-spinner' : this.type;
  }

  public onActionClick(): void {
    this.resolved = false;
    const actionClickArgs: ActionClickEventArgs = {
      resolve: () => {
        this.resolved = true;
      }
    };

    this.actionClick.emit(actionClickArgs);
  }
}
