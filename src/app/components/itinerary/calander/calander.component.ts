import { Component, Input, OnInit } from '@angular/core';
import ItineraryItem from 'src/app/models/itineraryItem';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss'],
})
export class CalanderComponent implements OnInit {
  @Input() itineraries!: ItineraryItem[];
  @Input() tripStartDate!: Date;
  @Input() tripEndDate!: Date;

  startDate: Date = new Date();
  endDate: Date = new Date();
  chosenDate: Date = new Date();
  constructor() {}

  ngOnInit(): void {
    if (this.tripStartDate && this.tripEndDate) {
      this.startDate = new Date(this.tripStartDate);
      this.endDate = new Date(this.tripEndDate);
      this.chosenDate = this.startDate;
    }
  }
}
