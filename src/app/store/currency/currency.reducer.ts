import { createReducer, on } from '@ngrx/store';
import * as CurrencyActions from './currency.actions';
import { CurrencyData } from 'src/app/models/currency';

export const currencyFeatureKey = 'currency';

export interface CurrencyState {
  isLoading: boolean;
  currencyRates: CurrencyData | null;
  selectedCurrency: CurrencyData;
}

export const initialState: CurrencyState = {
  isLoading: false,
  currencyRates: null,
  selectedCurrency: { code: 'USD', value: 1 },
};

export const reducer = createReducer(
  initialState,

  on(CurrencyActions.getCurrencyRates, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(CurrencyActions.getCurrencyRatesCompleted, (state, { currencyRates }) => ({
    ...state,
    isLoading: false,
    currencyRates,
  })),

  on(
    CurrencyActions.setSelectedCurrencyRate,
    (state, { selectedCurrency }) => ({
      ...state,
      selectedCurrency,
    })
  )
);
