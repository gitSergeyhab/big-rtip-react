import { useSelector } from 'react-redux';
import { getOpenedPointId } from '../../store/point-reducer/point-reducer-selectors';
import { Point } from '../../types/types';
import CollapsedPoint from '../collapsed-point/collapsed-point';
import ExpandedPoint from '../expanded-point/expanded-point';

export default function Event({point} : {point: Point}):JSX.Element {
  const openedId = useSelector(getOpenedPointId);
  return point.id === openedId ? <ExpandedPoint point={point}/> : <CollapsedPoint point={point}/>;
}
