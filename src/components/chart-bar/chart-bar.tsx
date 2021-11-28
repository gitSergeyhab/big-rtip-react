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
import { CountFunction, getGraphData, getOptions } from '../../utils/stat-utils';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


type ChartBarType = {countFunction: CountFunction, name: string, color: string, text: string}

export default function ChartBar({countFunction, name, color, text} : ChartBarType): JSX.Element {

  const points = useSelector(getPoints);
  const data = getGraphData({points, countFunction, name, color});
  const options = getOptions(color, text);

  return <Bar options={options} data={data}/>;
}
