import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setDisplayPoints } from '../../store/actions';
import { getDestinations, getDestinationsLoadedStatus } from '../../store/destinations-reducer/destinations-reducer-selectors';
import { getOffers, getOffersLoadedStatus } from '../../store/offer-reducer/offer-reducer-selectors';
import { getDisplayEvents, getPointsLoadedStatus } from '../../store/point-reducer/point-reducer-selectors';
import Header from '../header/header';
import Main from '../main/main';
import Stats from '../stats/stats';

function App(): JSX.Element {

  const points = useSelector(getDisplayEvents);
  const offers = useSelector(getOffers);
  const destination = useSelector(getDestinations);

  const arePointLoaded = useSelector(getPointsLoadedStatus);
  const areOffersLoaded = useSelector(getOffersLoadedStatus);
  const areDestinationsLoaded = useSelector(getDestinationsLoadedStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayPoints());
  }, [dispatch, arePointLoaded, areOffersLoaded, areDestinationsLoaded]);

  if (!arePointLoaded || !areOffersLoaded || !areDestinationsLoaded) {
    return <span>!!!!!!!!!!!!!!!!</span>;
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
      </Switch>

    </BrowserRouter>
  );
}

export default App;
