import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { AppRoute, Page } from './const';
import { createAPI } from './services/api';
import { setPage } from './store/actions';
import { fetchDestinationsAction, fetchOffersAction, fetchPointsAction } from './store/api-actions';
import { rootReducer } from './store/root-reducer';


const api = createAPI();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(fetchPointsAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchDestinationsAction());

if (window.location.pathname === AppRoute.Stats) {
  store.dispatch(setPage(Page.Stats));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
