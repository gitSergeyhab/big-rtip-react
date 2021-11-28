import { createReducer } from '@reduxjs/toolkit';
import { setPage } from '../actions';
import { Page } from '../../const';


type TopState =  {page: Page};

const initialState: TopState = {page: Page.Table};

export const topReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPage, (state, action) => {state.page = action.payload;});
});
