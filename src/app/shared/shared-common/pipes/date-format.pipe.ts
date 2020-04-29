import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');

  public transform(value: string | Date, format?: string): string {
    if (format) {
      return this.datePipe.transform(value, format);
    }

    return this.datePipe.transform(value, 'yyyy/MM/dd hh:mm');
  }
}
