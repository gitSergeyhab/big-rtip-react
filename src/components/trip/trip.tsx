import { useSelector } from 'react-redux';

import Event from '../event/event';
import { getNewPoint } from '../../store/point-reducer/point-reducer-selectors';
import { Point } from '../../types/types';


export default function Trip({points} : {points: Point[]}):JSX.Element {

  const events = points.map((point) => <Event point={point} key={point.id}/>);

  const newPoint = useSelector(getNewPoint);

  return (
    <ul className="trip-events__list">

      {newPoint ? <Event point={newPoint} key={newPoint.id}/> : null}

      {events}

    </ul>
  );
}
