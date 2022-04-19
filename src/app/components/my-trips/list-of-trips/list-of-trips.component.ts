import { Component, Input, OnInit } from '@angular/core';
import TripsModel from 'src/app/models/tripsModel';

@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.scss'],
})
export class ListOfTripsComponent implements OnInit {
  @Input() trips!: TripsModel[] | null;

  constructor() {}

  ngOnInit(): void {}

  identifyTrips(index: number, trip: TripsModel) {
    return trip.tripID;
  }
}
