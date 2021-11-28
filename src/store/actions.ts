import { createAction } from '@reduxjs/toolkit';
import { Destination, Offer, Point } from '../types/types';
import { FilterType, Page, SortType } from '../const';


export const enum ActionType {
  LoadPoints = 'data/points/LoadPoints',
  LoadOffers = 'data/offers/LoadOffers',
  LoadDestinations = 'data/destinations/LoadDestinations',
  OpenPoint = 'points/edit/OpenPoint',
  SetNewPoint = 'points/new/SetNewPoint',
  SetSortType = 'points/sort/SetSortType',
  SetFilterType = 'points/filter/SetFilterType',
  SetDisplayPoints = 'points/SetDisplayPoints',
  SetPage = 'top/SetPage',
}


export const loadPoints = createAction(ActionType.LoadPoints, (points: Point[]) => ({payload: points}));
export const loadOffers = createAction(ActionType.LoadOffers, (offers: Offer[]) => ({payload: offers}));
export const loadDestinations = createAction(ActionType.LoadDestinations, (destinations: Destination[]) => ({payload: destinations}));

export const setSortType = createAction(ActionType.SetSortType, (sort: SortType) => ({payload: sort}));
export const setFilterType = createAction(ActionType.SetFilterType, (filter: FilterType) => ({payload: filter}));
export const setDisplayPoints = createAction(ActionType.SetDisplayPoints);

export const openPoint = createAction(ActionType.OpenPoint, (pointId: null | string) => ({payload: pointId}));
export const setNewPoint = createAction(ActionType.SetNewPoint, (point: Point) => ({payload: point}));

export const setPage = createAction(ActionType.SetPage, (page: Page) => ({payload: page}));
