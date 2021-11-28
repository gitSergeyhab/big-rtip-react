import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';
import { Page } from '../../const';


export const getPage = (state: State): Page => state[ReducerName.Top].page;
