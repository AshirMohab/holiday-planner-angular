import { Component, Input, OnInit } from '@angular/core';
import { CurrencyData } from 'src/app/models/currency';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  @Input() currency!: CurrencyData;

  constructor() {}

  ngOnInit(): void {}
}
