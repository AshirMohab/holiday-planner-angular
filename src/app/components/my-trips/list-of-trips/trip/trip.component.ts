import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CurrencyData } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { TripState } from 'src/app/store/trip/trip.reducer';
import * as TripActions from 'src/app/store/trip/trip.actions';
import * as TripSelectors from 'src/app/store/trip/trip.selectors';
import { Observable } from 'rxjs';
import { removeUserTrip } from 'src/app/store/trip/trip.actions';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  selectedTrip$!: Observable<TripsModel>;

  @Input() currency!: CurrencyData;
  @Input() trip!: TripsModel;

  constructor(private stateStore: Store<TripState>) {}

  ngOnInit(): void {
    this.selectedTrip$ = this.stateStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );
  }

  selectUserTrip(selectedUserTrip: TripsModel) {
    this.stateStore.dispatch(
      TripActions.setSelectedUserTrip({ selectedUserTrip })
    );
  }

  removeTrip() {
    this.stateStore.dispatch(
      removeUserTrip({
        trip: this.trip,
      })
    );
  }
}
