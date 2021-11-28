import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { getPoints } from '../../store/point-reducer/point-reducer-selectors';
import { CountFunction, getGraphData } from '../../utils/stat-utils';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


const getOptions = (textColor: string, text: string ) => ({
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

type ChartBarType = {countFunction: CountFunction, name: string, color: string, text: string}

export default function ChartBar({countFunction, name, color, text} : ChartBarType): JSX.Element {

  const points = useSelector(getPoints);
  const data = getGraphData({points, countFunction, name, color});
  const options = getOptions(color, text);

  return <Bar options={options} data={data}/>;
}
