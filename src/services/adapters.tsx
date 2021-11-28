import { Point, ServerPoint } from '../types/types';

export const adaptPointToClient = (point: any): Point => {
  const clientPoint = {
    ...point,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite'],
  };

  delete clientPoint['is_favorite'];
  delete clientPoint['base_price'];
  delete clientPoint['date_from'];
  delete clientPoint['date_to'];

  return clientPoint;
};


export const adaptPointToServer = (point: any): ServerPoint => {
  const serverPoint = {
    ...point,
    'base_price': point.basePrice,
    'date_from': point.dateFrom,
    'date_to': point.dateTo,
    'is_favorite': point.isFavorite,
  };

  delete serverPoint.basePrice;
  delete serverPoint.dateFrom;
  delete serverPoint.dateTo;
  delete serverPoint.isFavorite;

  return serverPoint;
};
