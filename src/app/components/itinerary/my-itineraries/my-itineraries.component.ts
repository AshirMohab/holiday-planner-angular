import { Component, Input, OnInit } from '@angular/core';
import ItineraryItem from 'src/app/models/itineraryItem';

@Component({
  selector: 'app-my-itineraries',
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.scss'],
})
export class MyItinerariesComponent {
  @Input() itinerary!: ItineraryItem[] | null;
  @Input() currency!: string | undefined;

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
