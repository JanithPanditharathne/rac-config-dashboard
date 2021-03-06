import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { CustomFormValidator } from '../services';

@Directive({
  selector: '[appTwoDigitDecimal]'
})
export class TwoDigitDecimalDirective {

  @Input('decimals') decimals = 0;

  @Input('appTwoDigitDecimal') attr: boolean;

  constructor(private readonly elementRef: ElementRef) {
  }

  private check(value: string) {
    if (this.decimals <= 0) {
      return String(value).match(new RegExp(CustomFormValidator.integerWithTwoDecimalRegex));
    } else {
      const regExpString =
        `^\\s*((\\d+(\\.\\d{0,${this.decimals}})?)|((\\d*(\\.\\d{1,${this.decimals}}))))\\s*$`;
      return String(value).match(new RegExp(regExpString));
    }
  }

  private run(oldValue) {
    if (this.attr) {
      setTimeout(() => {
        const currentValue: string = this.elementRef.nativeElement.value;
        if (currentValue !== '' && !this.check(currentValue)) {
          this.elementRef.nativeElement.value = oldValue;
        }
      });
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.run(this.elementRef.nativeElement.value);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    this.run(this.elementRef.nativeElement.value);
  }
}
