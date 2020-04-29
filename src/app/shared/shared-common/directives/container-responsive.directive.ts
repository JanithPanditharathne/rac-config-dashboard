import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GlobalRefService } from 'ornamentum';

import { ContainerDimensions } from '../models';

@Directive({
  selector: '[appContainerResponsive]'
})
export class ContainerResponsiveDirective implements OnInit, OnDestroy {
  public triggerOnInit = true;

  private windowResizeSubscription;

  @Output('appContainerResponsive')
  public containerResponsive = new EventEmitter<ContainerDimensions>();

  @Input()
  public deltaHeight = 0;

  @Input()
  public deltaWidth = 0;

  @Input()
  public debounceTime = 500;

  constructor(private globalRef: GlobalRefService) {}

  public ngOnInit(): void {
    this.windowResizeSubscription = fromEvent(this.globalRef.window, 'resize')
      .pipe(debounceTime(this.debounceTime))
      .subscribe((event: any) => {
        const height = event.target.innerHeight;
        const width = event.target.innerWidth;

        this.containerResponsive.emit({
          height: height - this.deltaHeight,
          width: width - this.deltaWidth
        });
      });

    if (this.triggerOnInit) {
      this.containerResponsive.emit({
        height: this.globalRef.window.innerHeight - this.deltaHeight,
        width: this.globalRef.window.innerWidth - this.deltaWidth
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
  }
}
