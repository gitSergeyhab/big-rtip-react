import { createReducer } from '@reduxjs/toolkit';
import { Destination } from '../../types/types';
import { loadDestinations } from '../actions';


type DestinationState = {
  destinations: Destination[],
  areDestinationsLoaded: boolean,
}

const initialState: DestinationState = {
  destinations: [],
  areDestinationsLoaded: false,
};

export const destinationReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadDestinations, (state, action) => {
    state.destinations = action.payload;
    state.areDestinationsLoaded = true;
  });
});
