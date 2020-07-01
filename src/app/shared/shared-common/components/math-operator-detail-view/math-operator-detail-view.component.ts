import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-math-operator-detail-view',
  styleUrls: ['./math-operator-detail-view.component.scss'],
  templateUrl: './math-operator-detail-view.component.html'
})
export class MathOperatorDetailViewComponent {
  @Input()
  public operator: any;

  @Input()
  public hasMultipleValues = false;
}
