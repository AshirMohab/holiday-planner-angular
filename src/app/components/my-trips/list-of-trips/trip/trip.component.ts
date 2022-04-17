import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyData } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  @Input() currency!: CurrencyData;
  @Input() trip!: TripsModel;

  @Output() selectedTrip = new EventEmitter<TripsModel>();

  constructor() {}

  ngOnInit(): void {}

  selectTrip() {
    this.selectedTrip.emit({
      ...this.trip,
      name: this.trip.name + ' was selecetd',
    } as TripsModel);
  }
}
