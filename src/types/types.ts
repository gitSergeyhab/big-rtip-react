import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionTypeEP } from '../const';
import { ReducerState } from '../store/root-reducer';

export type OfferOption = {
    title: string,
    price: number,
}


export type Offer = {
  type: string,
  offers: OfferOption[]
}

export type Picture = {
  src: string,
  description: string,
}


export type Destination = {
  description: string,
  name: string,
  pictures: Picture[],
}

export type ServerPoint = {
  'base_price': number,
  'date_from': string,
  'date_to': string,
  destination: Destination,
  id: string,
  'is_favorite': boolean,
  offers: OfferOption[],
  type: string,
}

export type Point = {
  basePrice: number,
  dateFrom: string,
  dateTo: string,
  destination: Destination,
  id: string,
  isFavorite: boolean,
  offers: OfferOption[],
  type: string,
}

export type ExpPoint = {state: Point, setState: React.Dispatch<{type: ActionTypeEP; payload: any}>}


export type State = ReducerState;

export type ThunkActionResult<R=Promise<void>> = ThunkAction<R, State, AxiosInstance, AnyAction>
