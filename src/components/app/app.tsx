import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../header/header';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import Stats from '../stats/stats';
import { setDisplayPoints } from '../../store/actions';
import { getDestinationsLoadedStatus } from '../../store/destinations-reducer/destinations-reducer-selectors';
import { getOffersLoadedStatus } from '../../store/offer-reducer/offer-reducer-selectors';
import { getDisplayEvents, getPointsLoadedStatus } from '../../store/point-reducer/point-reducer-selectors';
import { AppRoute } from '../../const';


function App(): JSX.Element {

  const points = useSelector(getDisplayEvents);

  const arePointLoaded = useSelector(getPointsLoadedStatus);
  const areOffersLoaded = useSelector(getOffersLoadedStatus);
  const areDestinationsLoaded = useSelector(getDestinationsLoadedStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayPoints());
  }, [dispatch, arePointLoaded, areOffersLoaded, areDestinationsLoaded]);

  if (!arePointLoaded || !areOffersLoaded || !areDestinationsLoaded) {
    return <Spinner/>;
  }

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main points={points}/>
        </Route>
        <Route exact path={AppRoute.Stats}>
          <Stats/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
