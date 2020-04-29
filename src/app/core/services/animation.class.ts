import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

/**
 * Animation class.
 * This contains several animations.
 */
export class Animation {
  public static SlideInOutHide = trigger('slideInOutHide', [
    state(
      'true',
      style({
        display: 'none',
        height: '0',
        opacity: '0'
      })
    ),
    state(
      'false',
      style({
        display: 'block',
        height: '*',
        opacity: '1'
      })
    ),
    transition('1 => 0', animate('300ms ease-in')),
    transition('0 => 1', animate('300ms ease-out'))
  ]);

  public static routeFadeIn = trigger('routeFadeIn', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [style({ opacity: 0 }), animate('0.5s ease-in-out', style({ opacity: 1 }))], { optional: true }),
        query(':leave', [style({ opacity: 1 }), animate('0.5s ease-in-out', style({ opacity: 0 }))], { optional: true })
      ])
    ])
  ]);

  public static sidePanelSlideInOut = trigger('sidePanelSlideInOut', [
    // end state styles for route container (host)
    state(
      '*',
      style({
        // the view covers the whole screen with a semi tranparent background
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0
      })
    ),

    // route 'enter' transition
    transition(':enter', [
      // styles at start of transition
      style({
        // start with the content positioned off the right of the screen,
        // -400% is required instead of -100% because the negative position adds to the width of the element
        right: '-400%',

        // start with background opacity set to 0 (invisible)
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }),

      // animation and styles at end of transition
      animate(
        '.5s ease-in-out',
        style({
          // transition the right position to 0 which slides the content into view
          right: 0,

          // transition the background opacity to 0.8 to fade it in
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        })
      )
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate(
        '.5s ease-in-out',
        style({
          // transition the right position to -400% which slides the content out of view
          right: '-400%',

          // transition the background opacity to 0 to fade it out
          backgroundColor: 'rgba(0, 0, 0, 0)'
        })
      )
    ])
  ]);
}
