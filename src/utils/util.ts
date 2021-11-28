import dayjs from 'dayjs';

import { KeyboardEvent } from 'react';
import { Point } from '../types/types.js';
import { FilterType, SortType } from '../const';


const sortByDay = (pointA: Point, pointB: Point): number => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortByTime = (pointA: Point, pointB: Point): number => dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) - dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
const sortByPrice = (pointA: Point, pointB: Point): number => pointB.basePrice - pointA.basePrice;

const capitalize = (item: string): string => `${item[0].toUpperCase()}${item.slice(1)}`;

const isOnline = (): boolean => window.navigator.onLine;


const compareWithEscape = (evt: KeyboardEvent): boolean => evt.key === 'Escape' || evt.key === 'Esc';


const getFuturePoints = (points: Point[]): Point[] => points.filter((point) => dayjs().isBefore(point.dateFrom, 'day'));
const getPastPoints = (points: Point[]): Point[] => points.filter((point) => dayjs().isAfter(point.dateTo, 'day'));

const getFilteredPoints = (points: Point[], filterType : FilterType) => {
  switch (filterType) {
    case FilterType.Future: return getFuturePoints(points);
    case FilterType.Past: return getPastPoints(points);
    default: return [...points];
  }
};

const getSortedPoints = (points: Point[], sortType : SortType) => {
  switch (sortType) {
    case SortType.Time: return [...points].sort(sortByTime);
    case SortType.Price: return [...points].sort(sortByPrice);
    case SortType.Day: return [...points].sort(sortByDay);
    default: return [...points];}
};

const getDisplayPoints = (points: Point[], sortType : SortType, filterType : FilterType): Point[] => {
  const filtered = getFilteredPoints(points, filterType);
  return getSortedPoints(filtered, sortType);
};

const makeNewPoints = (newPoint: Point, oldPoints: Point[]): Point[] => {
  const index = oldPoints.findIndex((item) => item.id === newPoint.id);
  if (index === -1) {
    return [...oldPoints, newPoint];
  }

  return [...oldPoints.slice(0, index), newPoint, ...oldPoints.slice(index + 1)];
};

export {
  sortByDay,
  capitalize,
  isOnline,
  compareWithEscape,
  getDisplayPoints,
  makeNewPoints
};
