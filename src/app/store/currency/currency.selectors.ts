import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurrency from './currency.reducer';

export const selectCurrencyState =
  createFeatureSelector<fromCurrency.CurrencyState>(
    fromCurrency.currencyFeatureKey
  );

export const selectCurrrencyRates = createSelector(
  selectCurrencyState,
  (state) => state.currencyRates
);

export const selectSelectedCurrrencyRates = createSelector(
  selectCurrencyState,
  (state) => state.selectedCurrency
);
