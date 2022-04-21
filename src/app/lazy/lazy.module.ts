import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { MyTripsComponent } from '../components/my-trips/my-trips.component';
import { MyItinerariesComponent } from '../components/itinerary/my-itineraries/my-itineraries.component';
import { AddItineraryComponent } from '../components/itinerary/add-itinerary/add-itinerary.component';
import { AddTripsComponent } from '../components/my-trips/add-trips/add-trips.component';
import { ListOfTripsComponent } from '../components/my-trips/list-of-trips/list-of-trips.component';
import { EditTripsComponent } from '../components/my-trips/edit-trips/edit-trips.component';
import { ItineraryComponent } from '../components/itinerary/itinerary.component';
import { CalanderComponent } from '../components/itinerary/calander/calander.component';
import { TripComponent } from '../components/my-trips/list-of-trips/trip/trip.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LazyComponent,
    AddItineraryComponent,
    CalanderComponent,
    MyItinerariesComponent,
    ItineraryComponent,
    MyTripsComponent,
    AddTripsComponent,
    EditTripsComponent,
    ListOfTripsComponent,
    TripComponent,
  ],
  imports: [CommonModule, LazyRoutingModule, FormsModule, SharedModule],
})
export class LazyModule {}
