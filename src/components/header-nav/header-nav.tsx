import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { setPage } from '../../store/actions';
import { getPage } from '../../store/top-reducer/top-reducer-selectors';
import { AppRoute, Page } from '../../const';


const ACTIVE_CLASS = 'trip-tabs__btn--active';


function PageHref({page}: {page: Page}): JSX.Element {

  const dispatch = useDispatch();
  const currentPage = useSelector(getPage);
  const history = useHistory();

  const handlePageClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setPage(page));
    history.push(page===Page.Table ? AppRoute.Main : AppRoute.Stats);
  };

  return (
    <a
      onClick={handlePageClick}
      className={`trip-tabs__btn ${page === currentPage && ACTIVE_CLASS}`} href="/"
    >
      {page}
    </a>
  );
}


export default function HeaderNav(): JSX.Element {

  return (
    <div className="trip-controls__navigation">
      <h2 className="visually-hidden">Switch trip view</h2>
      <nav className="trip-controls__trip-tabs  trip-tabs">

        <PageHref page={Page.Table}/>
        <PageHref page={Page.Stats}/>

      </nav>
    </div>
  );
}
