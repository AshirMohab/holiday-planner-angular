import { Component, Input, OnInit } from '@angular/core';
import ItineraryItem from 'src/app/models/itineraryItem';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss'],
})
export class CalanderComponent implements OnInit {
  @Input() itinerary!: ItineraryItem[] | null;
  constructor() {}

  ngOnInit(): void {}

  colour: string = '';

  identifyItins(index: number, itins: ItineraryItem) {
    return itins.name;
  }

  setColourtag(itin: ItineraryItem) {
    if (itin.tag === 'Travel') {
      this.colour = 'blue';
    } else {
      this.colour = 'green';
    }
    return this.colour;
  }
}
