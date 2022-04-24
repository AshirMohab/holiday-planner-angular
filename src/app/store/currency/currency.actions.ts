import { createAction, props } from '@ngrx/store';
import {
  CurrencyData,
  CurrencyResponse,
  CurrencyType,
} from 'src/app/models/currency';

export const getCurrencyRates = createAction('[Currency] getCurrencyRates');

export const getCurrencyRatesCompleted = createAction(
  '[Currency] getCurrencyRatesCompleted',
  props<{ currencyRates: CurrencyData | null }>()
);

export const setSelectedCurrencyRate = createAction(
  '[Currency] setSelectedCurrencyRate',
  props<{ selectedCurrency: CurrencyData }>()
);
