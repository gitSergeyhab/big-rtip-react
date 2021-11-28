import { Point } from '../types/types';
import { getMinutes } from './data-time-utils';


type LabelObj = {type: string, sum: number}
const filterBySum = (object1: LabelObj, object2: LabelObj) => object2.sum - object1.sum;


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

const getOptions = (textColor: string, text: string ): {scales: any, responsive: boolean, plugins: any} => ({
  scales: {
    y: {
      title: {
        color: textColor,
        display: true,
        text: text,
        font: {
          size: 24,
        },
      },
    },
  },

  responsive: true,
  plugins: {
    legend: {
      position: 'left' as const,
      labels: {
        font: {
          size: 24,
        },
        color: 'rgb(0, 99, 132)',
      },
    },

    title: {
      display: true,
      text: 'Big Trip Stats',
    },
  },
});

export {
  getSumPrice,
  getCountType,
  getSumTime,
  getGraphData,
  getLabels,
  getOptions
};
