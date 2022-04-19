import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import ItineraryItem from 'src/app/models/itineraryItem';
import TripsModel from 'src/app/models/tripsModel';
import * as ItineraryActions from 'src/app/store/itinerary/itinerary.actions';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {
  isAddingItinerary: boolean = false;
  isShowingItinerary: boolean = true;
  isEditingItinerary: boolean = false;

  tripItineraryResponse!: Observable<ItineraryItem[]>;

  constructor() {}

  ngOnInit(): void {}
}
