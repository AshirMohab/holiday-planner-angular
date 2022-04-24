import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import TripsModel from 'src/app/models/tripsModel';
import {
  updateUserTrip,
  removeUserTripByID,
  removeUserTrip,
} from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import * as TripSelectors from 'src/app/store/trip/trip.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTripsComponent implements OnInit {
  editTripForm!: FormGroup;
  @Input() selectedTrip!: TripsModel | null;
  selectedTrip$!: Observable<TripsModel>;
  selectedTripID = '';
  isEditting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tripStore: Store<TripState>,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.selectedTripID = params?.['tripID'])
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.selectedTrip$ = this.tripStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );
  }

  initForm() {
    this.editTripForm = this.formBuilder.group({
      tripName: this.selectedTrip?.name,
      description: this.selectedTrip?.description,
      currency: this.selectedTrip?.currency,
      tripCost: 0,
      email: this.selectedTrip?.userEmail,
    });
  }

  submitTrip() {
    return (
      this.editTripForm.get('tripName')?.enabled &&
      this.editTripForm.get('description')?.enabled &&
      this.editTripForm.get('currency')?.enabled &&
      this.editTripForm.get('email')?.enabled
    );
  }

  updateTrip() {
    const newTrip: TripsModel = {
      tripID: this.selectedTrip?.tripID || '',
      userID: this.selectedTrip?.userID || '',
      name: this.editTripForm.value.tripName,
      description: this.editTripForm.value.description,
      currency: this.editTripForm.value.currency,
      userEmail: this.editTripForm.value.email,
      itinerary: this.selectedTrip?.itinerary || [],
    };

    this.tripStore.dispatch(updateUserTrip({ trip: newTrip }));
    this.isEditting = true;
  }
}
