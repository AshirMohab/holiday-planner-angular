import { Pipe, PipeTransform } from '@angular/core';
import TripsModel from '../models/tripsModel';

@Pipe({
  name: 'tripPipe',
})
export class TripPipePipe implements PipeTransform {
  transform(trips: TripsModel[], fliterText: string): TripsModel[] {
    if (!fliterText || fliterText.length === 0) {
      return trips;
    }
    return trips;
  }
}
