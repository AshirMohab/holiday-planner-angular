import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itineraryPipe'
})
export class ItineraryPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
