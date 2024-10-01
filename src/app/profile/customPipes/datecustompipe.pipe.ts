import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datecustompipe'
})
export class DatecustompipePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'dd.MM.yyyy'): any {
    return this.datePipe.transform(value, format);
  }

}
