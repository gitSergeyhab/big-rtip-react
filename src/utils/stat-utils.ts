import { Point } from '../types/types';
import { getMinutes, getDateFormat } from './data-time-utils';

type LabelObj = {type: string, sum: number}
const filterBySum = (object1: LabelObj, object2: LabelObj) => object2.sum - object1.sum;


export type FormatFunction = (param: number) => string
const getPriceFormat: FormatFunction = (price) => `€ ${price}`;
const getCountFormat: FormatFunction = (val) => `${val}x`;
const getTimeFormat: FormatFunction = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(minutes / 60 / 24 );
  return getDateFormat (days, hours, minutes);
};

export type CountFunction = (points: Point[], label: string) => number;

const getSumPrice: CountFunction = (points, label) => points.reduce((acc, point) => point.type === label ? acc + point.basePrice : acc, 0);
const getCountType: CountFunction = (points, label) => points.reduce((acc, point) => point.type === label ? ++acc : acc, 0);
const getSumTime: CountFunction = (points, label) => points.reduce((acc, point) => point.type === label ? acc + getMinutes(point.dateFrom, point.dateTo) : acc, 0);

const getLabels = (points: Point[]): string[] => ([...new Set(points.map((point) => point.type))]);


type DataSet = {label: string, data: number[], backgroundColor: string}
type GraphDataArgs = {points: Point[], countFunction: CountFunction, name: string, color: string}
type GraphDataRes = {labels: string[], datasets: DataSet[]}

const getGraphData = ({points, countFunction, name, color} : GraphDataArgs): GraphDataRes=> {
  const labels = getLabels(points);
  const labelCounts = labels.map((label) => ({type: label, sum: countFunction(points, label)}));
  labelCounts.sort(filterBySum);
  return {
    labels: labelCounts.map((labelPrice) => labelPrice.type.toUpperCase()),
    datasets: [{
      label: name,
      data: labelCounts.map((labelPrice) => labelPrice.sum),
      backgroundColor: color,
    }],
  };
};

export {
  getPriceFormat,
  getCountFormat,
  getTimeFormat,
  getSumPrice,
  getCountType,
  getSumTime,
  getGraphData,
  getLabels
};
