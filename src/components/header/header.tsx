import { useDispatch, useSelector } from 'react-redux';
import { defaultNewPoint, Page } from '../../const';
import { openPoint, setNewPoint } from '../../store/actions';
import { getNewPoint } from '../../store/point-reducer/point-reducer-selectors';
import { getPage } from '../../store/top-reducer/top-reducer-selectors';
import HeaderFilter from '../header-filter/header-filter';
import HeaderInfo from '../header-info/header-info';
import HeaderNav from '../header-nav/header-nav';

export default function Header(): JSX.Element {

  const dispatch = useDispatch();
  const newPoint = useSelector(getNewPoint);
  const page = useSelector(getPage);

  const handleNewEventClick = () => {
    dispatch(openPoint(defaultNewPoint.id));
    dispatch(setNewPoint({...defaultNewPoint}));
  };

  return (
    <header className="page-header">
      <div className="page-body__container  page-header__container">
        <img className="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo"/>

        <div className="trip-main">

          <HeaderInfo/>

          <div className="trip-main__trip-controls  trip-controls">

            <HeaderNav/>

            <HeaderFilter/>

          </div>

          <button
            onClick={handleNewEventClick}
            className="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button"
            disabled={!!newPoint || page !== Page.Table}
          >
            New event
          </button>
        </div>
      </div>
    </header>
  );
}
