import {
  createAction,
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';
import { CurrencyData, CurrencyType } from 'src/app/models/currency';
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
