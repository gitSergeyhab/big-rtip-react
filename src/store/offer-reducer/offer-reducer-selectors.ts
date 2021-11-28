import { Offer, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


export const getOffers = (state: State): Offer[] => state[ReducerName.Offer].offers;
export const getOffersLoadedStatus = (state: State): boolean => state[ReducerName.Offer].areOffersLoaded;
