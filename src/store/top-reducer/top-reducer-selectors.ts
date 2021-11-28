import { Page } from '../../const';
import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';

export const getPage = (state: State): Page => state[ReducerName.Top].page;
