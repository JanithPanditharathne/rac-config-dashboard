import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

/**
 * Component class to represent application info label.
 * @class InfoLabelComponent
 */
@Component({
  selector: 'app-info-label',
  styleUrls: ['./info-label.component.scss'],
  templateUrl: './info-label.component.html'
})
export class InfoLabelComponent {
  @ContentChild('customDescription', { static: false })
  public customDescription: TemplateRef<string>;

  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public placement: string;

  @Input()
  public outsideClick: boolean;
}
