import { createSelector } from 'reselect';
import { OfferOption, Point, State } from '../../types/types';
import { ReducerName } from '../root-reducer';

const sumOfferPrices = (offers: OfferOption[]) => offers.reduce((acc, elem) => acc + elem.price , 0);

const field = ReducerName.Point;
export const getPoints = (state: State): Point[] => state[field].points;
export const getPointsLoadedStatus = (state: State): boolean => state[field].arePointsLoaded;
export const getOpenedPointId = (state: State): string | null => state[field].openedPointId;
export const getNewPoint = (state: State): Point | null => state[field].newPoint;

export const getDisplayEvents = (state: State): Point[] => state[field].displayPoints;

export const getTotalBasePrice = createSelector([getPoints], (points) => points.reduce((acc, elem) => acc + elem.basePrice, 0));
export const getTotalOfferPrices = createSelector([getPoints], (points) => points.reduce((acc, elem) => acc + sumOfferPrices(elem.offers), 0));
