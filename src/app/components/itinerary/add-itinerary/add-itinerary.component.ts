import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.scss'],
})
export class AddItineraryComponent implements OnInit {
  addItineraryForm!: FormGroup;

  constructor(
    private userService: UserService,
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
      costEstimate: 0,
    });
  }

  submitItinerary() {}
}
