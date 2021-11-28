
// import Chart from 'chart.js'
// import { ChartName } from '../const';
// import { Point } from '../types/types';
// import { CountFunction, FormatFunction, getGraphData } from './stat-utils';


// type CtxType = string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>
// type RenderChartType = {ctx: CtxType, points: Point[], countFunction: CountFunction, formatFunction: FormatFunction, chartName: ChartName}

// /* eslint-disable */
// export const renderChart = ({ctx, points, countFunction, formatFunction, chartName} : RenderChartType): Chart => {
//   const {labels, counts} = getGraphData(points, countFunction);
//   return new Chart(ctx, {
//     plugins: [ChartDataLabels],
//     type: 'horizontalBar',
//     data: {
//       labels,
//       datasets: [{
//         data: counts,
//         backgroundColor: '#ffffff',
//         hoverBackgroundColor: '#ffffff',
//         anchor: 'start',
//       }],
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13,
//           },
//           color: '#000000',
//           anchor: 'end',
//           align: 'start',
//           formatter: formatFunction,
//         },
//       },
//       title: {
//         display: true,
//         text: chartName.toUpperCase(),
//         fontColor: '#000000',
//         fontSize: 23,
//         position: 'left',
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: '#000000',
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//           minBarLength: 50,
//         }],
//       },
//       legend: {
//         display: false,
//       },
//       tooltips: {
//         enabled: false,
//       },
//     },
//   });
// };


export const X = 'X';
