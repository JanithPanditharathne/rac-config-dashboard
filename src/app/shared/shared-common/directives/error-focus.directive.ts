import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appErrorFocus]'
})
export class ErrorFocusDirective implements OnChanges {
  @Input('appErrorFocus')
  public focus: boolean;

  @Input()
  public focusElement: any;

  @HostBinding('class.auth-error')
  public errorClass: boolean;

  constructor(private readonly elementRef: ElementRef) {
  }

  public ngOnChanges() {
    if (this.focus) {
      this.errorClass = true;
      this.elementRef.nativeElement.scrollIntoView(false);
      if (this.focusElement) {
        this.focusElement.focus();
      }
      this.focus = false;
    } else {
      this.errorClass = false;
    }
  }
}
