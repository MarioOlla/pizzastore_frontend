import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToString'
})
export class BooleanToStringPipe implements PipeTransform {

  transform(value: boolean, ...args: string[]): string {
    return value?'SI':'NO';
  }

}
