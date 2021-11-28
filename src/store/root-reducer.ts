import { combineReducers } from 'redux';

import { destinationReducer } from './destinations-reducer/destinations-reducer';
import { offerReducer } from './offer-reducer/offer-reducer';
import { pointReducer } from './point-reducer/point-reducer';
import { topReducer } from './top-reducer/top-reducer';


export const enum ReducerName {
  Point = 'Point',
  Offer = 'Offer',
  Destination = 'Destination',
  Top = 'Top'

}

export const rootReducer = combineReducers({
  [ReducerName.Point]: pointReducer,
  [ReducerName.Offer]: offerReducer,
  [ReducerName.Destination]: destinationReducer,
  [ReducerName.Top]: topReducer,
});

export type ReducerState = ReturnType<typeof rootReducer>;
