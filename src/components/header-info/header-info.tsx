import { useSelector } from 'react-redux';

import { getPoints, getTotalBasePrice, getTotalOfferPrices } from '../../store/point-reducer/point-reducer-selectors';
import { Point } from '../../types/types';
import { getMonthAndDay } from '../../utils/data-time-utils';
import { sortByDay } from '../../utils/util';


const getDates = (points: Point[]) =>
  <p className="trip-info__dates">{getMonthAndDay(points[0].dateFrom)} &nbsp;&mdash;&nbsp; {getMonthAndDay(points[points.length - 1].dateTo)}</p>;
export default function HeaderInfo(): JSX.Element {

  const basePriceTotal = useSelector(getTotalBasePrice);
  const offerPriceTotal = useSelector(getTotalOfferPrices);

  const films = useSelector(getPoints);
  const sorted = [...films].sort(sortByDay);

  let title = <h1 className="trip-info__title"> &mdash;</h1>;
  let dates = <p className="trip-info__dates">&mdash;</p>;

  if (films.length) {
    dates = getDates(sorted);
  }

  if (films.length > 3) {
    title = <h1 className="trip-info__title"> {sorted[0].destination.name} &mdash; ... &mdash; {sorted[sorted.length - 1].destination.name}</h1>;
  }
  if (films.length === 3) {
    title = <h1 className="trip-info__title"> {sorted[0].destination.name} &mdash; {sorted[1].destination.name} &mdash; {sorted[sorted.length - 1].destination.name}</h1>;
  }
  if (films.length === 1) {
    title = <h1 className="trip-info__title"> {sorted[0].destination.name} </h1>;
  }
  if (films.length === 2) {
    title = <h1 className="trip-info__title"> {sorted[0].destination.name} &mdash; {sorted[sorted.length - 1].destination.name}</h1>;
  }

  return(
    <section className="trip-main__trip-info  trip-info">
      <div className="trip-info__main">

        {title}

        {dates}

      </div>

      <p className="trip-info__cost">
        Total: &euro;&nbsp;<span className="trip-info__cost-value">{basePriceTotal + offerPriceTotal}</span>
      </p>
    </section>
  );
}
