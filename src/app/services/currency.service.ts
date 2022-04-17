import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyResponse } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrency(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(
      `https://api.currencyapi.com/v3/latest`
    );
  }
}
