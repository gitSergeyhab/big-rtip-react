import { createSelector } from 'reselect';
import { Destination, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


export const getDestinations = (state: State): Destination[]  => state[ReducerName.Destination].destinations;
export const getDestinationsLoadedStatus = (state: State): boolean  => state[ReducerName.Destination].areDestinationsLoaded;

export const getCities = createSelector([getDestinations], (destinations) => destinations.map((destination) => destination.name));
