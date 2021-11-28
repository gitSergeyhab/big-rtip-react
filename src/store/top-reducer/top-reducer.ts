import { createReducer } from '@reduxjs/toolkit';
import { Page } from '../../const';
import { setPage } from '../actions';

type TopState =  {page: Page};

const initialState: TopState = {page: Page.Table};

export const topReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPage, (state, action) => {state.page = action.payload;});
});
