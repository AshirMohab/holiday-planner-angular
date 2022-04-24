import { Component, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import ItineraryItem from 'src/app/models/itineraryItem';
import TripsModel from 'src/app/models/tripsModel';
import { updateUserTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import * as TripSelectors from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-my-itineraries',
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.scss'],
})
export class MyItinerariesComponent {
  @Input() itinerary!: ItineraryItem[] | null;
  @Input() currency!: string | undefined;
  @Input() selectedTrip!: TripsModel | null;

  colour: string = '';
  isDeleting: boolean = false;

  constructor(private tripStore: Store<TripState>) {}

  identifyItins(index: number, itin: ItineraryItem) {
    return itin.name;
  }

  setColourtag(itin: ItineraryItem) {
    if (itin.tag === 'Travel') {
      this.colour = 'blue';
    } else {
      this.colour = 'green';
    }
    return this.colour;
  }

  removeItinerary(itin: ItineraryItem) {
    const filtered = this.itinerary?.filter(function (value, index, itinArray) {
      return value !== itin;
    });

    if (this.selectedTrip && filtered) {
      const newTrip: TripsModel = {
        ...this.selectedTrip,
        itinerary: filtered,
      };
      this.tripStore.dispatch(updateUserTrip({ trip: newTrip }));
      this.isDeleting = true;
    }
  }
}
