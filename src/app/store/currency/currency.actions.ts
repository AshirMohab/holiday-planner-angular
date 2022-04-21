import { createAction, props } from '@ngrx/store';
import { CurrencyData, CurrencyType } from 'src/app/models/currency';

export const getCurrencyRates = createAction('[Currency] getCurrencyRates');

export const getCurrencyRatesCompleted = createAction(
  '[Currency] getCurrencyRatesCompleted',
  props<{ currencyRates: CurrencyType | null }>()
);

export const setSelectedCurrencyRate = createAction(
  '[Currency] setSelectedCurrencyRate',
  props<{ selectedCurrency: CurrencyData }>()
);
