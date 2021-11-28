import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openPoint } from '../../store/actions';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { OfferOption, Point } from '../../types/types';
import { getDiffTime, getHoursAndMinutes, getMonthAndDay } from '../../utils/data-time-utils';
import { capitalize } from '../expanded-point-header/expanded-point-header';


function SelectedOffer ({offer}: {offer: OfferOption}): JSX.Element {
  return (
    <li className="event__offer">
      <span className="event__offer-title">{offer.title}</span>
      &nbsp; + &euro; &nbsp;
      <span className="event__offer-price">{offer.price}</span>
    </li>
  );
}

export default function CollapsedPoint({point}: {point: Point}): JSX.Element {

  const {id, basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;

  const date = getMonthAndDay(dateFrom);
  const src = `img/icons/${type}.png`;
  const eventTitle = `${capitalize(type)} ${destination.name}`;
  const formatDateFrom = getHoursAndMinutes(dateFrom);
  const formatDateTo = getHoursAndMinutes(dateTo);
  const duration = getDiffTime(dateFrom, dateTo);
  const favoriteBtnClasses = isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';

  const selectedOffers = offers.map((offer) => <SelectedOffer offer={offer} key={offer.title}/>);

  const [errorForm, setErrorForm] = useState(false);


  const dispatch = useDispatch();

  const handleOpenPointClick = () => dispatch(openPoint(id));

  const handleFavoriteBtnClick = () => {
    const newPoint = {...point, isFavorite: !point.isFavorite};
    dispatch(changeFavoriteStatusAction({point: newPoint, setErrorForm}));
  };

  const shake = errorForm ? 'shake' : '';

  return(
    <li className={`trip-events__item ${shake}`}>
      <div className="event">
        <time className="event__date" dateTime="2019-03-18">{date}</time>
        <div className="event__type">
          <img className="event__type-icon" width="42" height="42" src={src} alt="Event type icon"/>
        </div>
        <h3 className="event__title">{eventTitle}</h3>
        <div className="event__schedule">
          <p className="event__time">
            <time className="event__start-time" dateTime="2019-03-18T10:30">{formatDateFrom}</time>
          &mdash;
            <time className="event__end-time" dateTime="2019-03-18T11:00">{formatDateTo}</time>
          </p>
          <p className="event__duration">{duration}</p>
        </div>
        <p className="event__price">
        &euro;&nbsp;<span className="event__price-value">{basePrice}</span>
        </p>
        <h4 className="visually-hidden">Offers:</h4>
        <ul className="event__selected-offers">

          {selectedOffers}

        </ul>
        <button
          onClick={handleFavoriteBtnClick}
          className={favoriteBtnClasses} type="button"
        >
          <span className="visually-hidden">Add to favorite</span>
          <svg className="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button
          onClick={handleOpenPointClick}
          className="event__rollup-btn" type="button"
        >
          <span className="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  );
}
