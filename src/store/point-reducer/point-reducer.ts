import { createReducer } from '@reduxjs/toolkit';

import { Point } from '../../types/types';
import { getDisplayPoints } from '../../utils/util';
import { loadPoints, openPoint, setDisplayPoints, setFilterType, setNewPoint, setSortType } from '../actions';
import { FilterType, SortType } from '../../const';


type PointState = {
  points: Point[],
  arePointsLoaded: boolean,
  openedPointId: string | null,
  newPoint: Point | null,
  filter: FilterType,
  sort: SortType,
  displayPoints: Point[],
}

const initialState: PointState = {
  points: [],
  arePointsLoaded: false,
  openedPointId: null,
  newPoint: null,
  filter: FilterType.Everything,
  sort: SortType.Day,
  displayPoints: [],
};

export const pointReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPoints, (state, action) => {
      state.points = action.payload;
      state.arePointsLoaded = true;
    })
    .addCase(openPoint, (state, action) => {
      state.openedPointId = action.payload;
      state.newPoint = null;
    })
    .addCase(setNewPoint, (state, action) => {state.newPoint = action.payload;})
    .addCase(setFilterType, (state, action) => {state.filter = action.payload;})
    .addCase(setSortType, (state, action) => {state.sort = action.payload;})
    .addCase(setDisplayPoints, (state) => {
      state.displayPoints = getDisplayPoints(state.points, state.sort, state.filter);
    });
});
