import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import TripsModel from 'src/app/models/tripsModel';
import { TripState } from 'src/app/store/trip/trip.reducer';

import * as TripSelectors from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {
  isAddingItinerary: boolean = false;
  isShowingItinerary: boolean = true;
  isEditingItinerary: boolean = false;

  selectedTrip$!: Observable<TripsModel>;
  @Input() selectedTrip!: TripsModel | null;

  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private tripStore: Store<TripState>) {}

  ngOnInit(): void {
    this.selectedTrip$ = this.tripStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );
  }
}
