import { Point } from './types/types';


export const NEW_POINT_ID = 'NEW_POINT_ID';

export const enum APIRoute {
  Points = 'points',
  Offers = '/offers',
  Destinations = '/destinations',
}


export const defaultNewPoint: Point = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination:  {
    description: '',
    name: '',
    pictures: [],
  },
  id: NEW_POINT_ID,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export const enum ActionTypeEP {
  SetPrise = 'SetPrise',
  SetDateFrom = 'SetDateFrom',
  SetDateTo = 'SetDateTo',
  SetDestination = 'SetDestination',
  SetFavorite = 'SetFavorite',
  SetOffers = 'SetOffers',
  SetType = 'SetType',
}

export const enum FilterType {
  Past = 'Past',
  Future = 'Future',
  Everything = 'Everything',
}

export  enum SortType {
  Day = 'day',
  Event = 'event',
  Time = 'time',
  Price = 'price',
  Offers = 'offers'
}

export enum Page {
  Table = 'Table',
  Stats = 'Stats',
}

export enum AppRoute {
  Main = '/',
  Stats = '/stats',
}

export enum ChartName {
  Money = 'Money',
  Type = 'Type',
  Time ='Time-Spend',
}
