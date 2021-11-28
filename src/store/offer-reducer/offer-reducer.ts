import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/types';
import { loadOffers } from '../actions';

type OfferState = {
  offers: Offer[],
  areOffersLoaded: boolean,
}

const initialState: OfferState = {
  offers: [],
  areOffersLoaded: false,
};

export const offerReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
    state.areOffersLoaded = true;
  });
});
