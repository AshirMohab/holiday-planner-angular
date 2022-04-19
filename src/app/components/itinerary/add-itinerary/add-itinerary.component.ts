import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import ItineraryItem from 'src/app/models/itineraryItem';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.scss'],
})
export class AddItineraryComponent implements OnInit {
  addItineraryForm!: FormGroup;

  constructor(
    private tripService: TripService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addItineraryForm = this.formBuilder.group({
      name: [''],
      tag: [''],
      startDate: new Date(),
      endDate: new Date(),
      cost: 0,
    });
  }

  submitItinerary() {
    return (
      this.addItineraryForm.get('name')?.enabled &&
      this.addItineraryForm.get('tag')?.enabled &&
      this.addItineraryForm.get('startDate')?.enabled &&
      this.addItineraryForm.get('endDate')?.enable &&
      this.addItineraryForm.get('cost')?.enabled
    );
  }

  addItinerary() {
    const itinerary: ItineraryItem = {
      name: this.addItineraryForm.value.name,
      tag: this.addItineraryForm.value.tag,
      startDate: this.addItineraryForm.value.startDate,
      endDate: this.addItineraryForm.value.endDate,
      costEstimate: this.addItineraryForm.value.cost,
    };
    this.tripService.addTripItinerary(itinerary);
  }
}
