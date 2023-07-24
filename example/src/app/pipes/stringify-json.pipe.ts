import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyJson'
})
export class StringifyJsonPipe implements PipeTransform {

  transform(value: any, indentSpace = 0): string {
    return JSON.stringify(value, null, indentSpace) || '';
  }

}
