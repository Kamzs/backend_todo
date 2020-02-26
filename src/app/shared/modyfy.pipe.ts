import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modyfy'
})
export class ModyfyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
